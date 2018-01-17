package org.spatial.crowdsource.web.rest;

import org.spatial.crowdsource.SpacialcrowdsourcingApp;

import org.spatial.crowdsource.domain.WorkerTaskAssignment;
import org.spatial.crowdsource.repository.WorkerTaskAssignmentRepository;
import org.spatial.crowdsource.service.WorkerTaskAssignmentService;
import org.spatial.crowdsource.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.spatial.crowdsource.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the WorkerTaskAssignmentResource REST controller.
 *
 * @see WorkerTaskAssignmentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SpacialcrowdsourcingApp.class)
public class WorkerTaskAssignmentResourceIntTest {

    private static final String DEFAULT_WORKER = "AAAAAAAAAA";
    private static final String UPDATED_WORKER = "BBBBBBBBBB";

    private static final String DEFAULT_TASK = "AAAAAAAAAA";
    private static final String UPDATED_TASK = "BBBBBBBBBB";

    @Autowired
    private WorkerTaskAssignmentRepository workerTaskAssignmentRepository;

    @Autowired
    private WorkerTaskAssignmentService workerTaskAssignmentService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restWorkerTaskAssignmentMockMvc;

    private WorkerTaskAssignment workerTaskAssignment;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WorkerTaskAssignmentResource workerTaskAssignmentResource = new WorkerTaskAssignmentResource(workerTaskAssignmentService);
        this.restWorkerTaskAssignmentMockMvc = MockMvcBuilders.standaloneSetup(workerTaskAssignmentResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WorkerTaskAssignment createEntity(EntityManager em) {
        WorkerTaskAssignment workerTaskAssignment = new WorkerTaskAssignment()
            .worker(DEFAULT_WORKER)
            .task(DEFAULT_TASK);
        return workerTaskAssignment;
    }

    @Before
    public void initTest() {
        workerTaskAssignment = createEntity(em);
    }

    @Test
    @Transactional
    public void createWorkerTaskAssignment() throws Exception {
        int databaseSizeBeforeCreate = workerTaskAssignmentRepository.findAll().size();

        // Create the WorkerTaskAssignment
        restWorkerTaskAssignmentMockMvc.perform(post("/api/worker-task-assignments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workerTaskAssignment)))
            .andExpect(status().isCreated());

        // Validate the WorkerTaskAssignment in the database
        List<WorkerTaskAssignment> workerTaskAssignmentList = workerTaskAssignmentRepository.findAll();
        assertThat(workerTaskAssignmentList).hasSize(databaseSizeBeforeCreate + 1);
        WorkerTaskAssignment testWorkerTaskAssignment = workerTaskAssignmentList.get(workerTaskAssignmentList.size() - 1);
        assertThat(testWorkerTaskAssignment.getWorker()).isEqualTo(DEFAULT_WORKER);
        assertThat(testWorkerTaskAssignment.getTask()).isEqualTo(DEFAULT_TASK);
    }

    @Test
    @Transactional
    public void createWorkerTaskAssignmentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = workerTaskAssignmentRepository.findAll().size();

        // Create the WorkerTaskAssignment with an existing ID
        workerTaskAssignment.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWorkerTaskAssignmentMockMvc.perform(post("/api/worker-task-assignments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workerTaskAssignment)))
            .andExpect(status().isBadRequest());

        // Validate the WorkerTaskAssignment in the database
        List<WorkerTaskAssignment> workerTaskAssignmentList = workerTaskAssignmentRepository.findAll();
        assertThat(workerTaskAssignmentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllWorkerTaskAssignments() throws Exception {
        // Initialize the database
        workerTaskAssignmentRepository.saveAndFlush(workerTaskAssignment);

        // Get all the workerTaskAssignmentList
        restWorkerTaskAssignmentMockMvc.perform(get("/api/worker-task-assignments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(workerTaskAssignment.getId().intValue())))
            .andExpect(jsonPath("$.[*].worker").value(hasItem(DEFAULT_WORKER.toString())))
            .andExpect(jsonPath("$.[*].task").value(hasItem(DEFAULT_TASK.toString())));
    }

    @Test
    @Transactional
    public void getWorkerTaskAssignment() throws Exception {
        // Initialize the database
        workerTaskAssignmentRepository.saveAndFlush(workerTaskAssignment);

        // Get the workerTaskAssignment
        restWorkerTaskAssignmentMockMvc.perform(get("/api/worker-task-assignments/{id}", workerTaskAssignment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(workerTaskAssignment.getId().intValue()))
            .andExpect(jsonPath("$.worker").value(DEFAULT_WORKER.toString()))
            .andExpect(jsonPath("$.task").value(DEFAULT_TASK.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingWorkerTaskAssignment() throws Exception {
        // Get the workerTaskAssignment
        restWorkerTaskAssignmentMockMvc.perform(get("/api/worker-task-assignments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWorkerTaskAssignment() throws Exception {
        // Initialize the database
        workerTaskAssignmentService.save(workerTaskAssignment);

        int databaseSizeBeforeUpdate = workerTaskAssignmentRepository.findAll().size();

        // Update the workerTaskAssignment
        WorkerTaskAssignment updatedWorkerTaskAssignment = workerTaskAssignmentRepository.findOne(workerTaskAssignment.getId());
        // Disconnect from session so that the updates on updatedWorkerTaskAssignment are not directly saved in db
        em.detach(updatedWorkerTaskAssignment);
        updatedWorkerTaskAssignment
            .worker(UPDATED_WORKER)
            .task(UPDATED_TASK);

        restWorkerTaskAssignmentMockMvc.perform(put("/api/worker-task-assignments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedWorkerTaskAssignment)))
            .andExpect(status().isOk());

        // Validate the WorkerTaskAssignment in the database
        List<WorkerTaskAssignment> workerTaskAssignmentList = workerTaskAssignmentRepository.findAll();
        assertThat(workerTaskAssignmentList).hasSize(databaseSizeBeforeUpdate);
        WorkerTaskAssignment testWorkerTaskAssignment = workerTaskAssignmentList.get(workerTaskAssignmentList.size() - 1);
        assertThat(testWorkerTaskAssignment.getWorker()).isEqualTo(UPDATED_WORKER);
        assertThat(testWorkerTaskAssignment.getTask()).isEqualTo(UPDATED_TASK);
    }

    @Test
    @Transactional
    public void updateNonExistingWorkerTaskAssignment() throws Exception {
        int databaseSizeBeforeUpdate = workerTaskAssignmentRepository.findAll().size();

        // Create the WorkerTaskAssignment

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restWorkerTaskAssignmentMockMvc.perform(put("/api/worker-task-assignments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workerTaskAssignment)))
            .andExpect(status().isCreated());

        // Validate the WorkerTaskAssignment in the database
        List<WorkerTaskAssignment> workerTaskAssignmentList = workerTaskAssignmentRepository.findAll();
        assertThat(workerTaskAssignmentList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteWorkerTaskAssignment() throws Exception {
        // Initialize the database
        workerTaskAssignmentService.save(workerTaskAssignment);

        int databaseSizeBeforeDelete = workerTaskAssignmentRepository.findAll().size();

        // Get the workerTaskAssignment
        restWorkerTaskAssignmentMockMvc.perform(delete("/api/worker-task-assignments/{id}", workerTaskAssignment.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<WorkerTaskAssignment> workerTaskAssignmentList = workerTaskAssignmentRepository.findAll();
        assertThat(workerTaskAssignmentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WorkerTaskAssignment.class);
        WorkerTaskAssignment workerTaskAssignment1 = new WorkerTaskAssignment();
        workerTaskAssignment1.setId(1L);
        WorkerTaskAssignment workerTaskAssignment2 = new WorkerTaskAssignment();
        workerTaskAssignment2.setId(workerTaskAssignment1.getId());
        assertThat(workerTaskAssignment1).isEqualTo(workerTaskAssignment2);
        workerTaskAssignment2.setId(2L);
        assertThat(workerTaskAssignment1).isNotEqualTo(workerTaskAssignment2);
        workerTaskAssignment1.setId(null);
        assertThat(workerTaskAssignment1).isNotEqualTo(workerTaskAssignment2);
    }
}
