package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.Sharework2App;
import com.mycompany.myapp.domain.Matches;
import com.mycompany.myapp.repository.MatchesRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link MatchesResource} REST controller.
 */
@SpringBootTest(classes = Sharework2App.class)
@AutoConfigureMockMvc
@WithMockUser
public class MatchesResourceIT {

    private static final Integer DEFAULT_LEFTCOMPANYID = 1;
    private static final Integer UPDATED_LEFTCOMPANYID = 2;

    private static final Integer DEFAULT_RIGHTCOMPANYID = 1;
    private static final Integer UPDATED_RIGHTCOMPANYID = 2;

    @Autowired
    private MatchesRepository matchesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMatchesMockMvc;

    private Matches matches;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Matches createEntity(EntityManager em) {
        Matches matches = new Matches()
            .leftcompanyid(DEFAULT_LEFTCOMPANYID)
            .rightcompanyid(DEFAULT_RIGHTCOMPANYID);
        return matches;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Matches createUpdatedEntity(EntityManager em) {
        Matches matches = new Matches()
            .leftcompanyid(UPDATED_LEFTCOMPANYID)
            .rightcompanyid(UPDATED_RIGHTCOMPANYID);
        return matches;
    }

    @BeforeEach
    public void initTest() {
        matches = createEntity(em);
    }

    @Test
    @Transactional
    public void createMatches() throws Exception {
        int databaseSizeBeforeCreate = matchesRepository.findAll().size();
        // Create the Matches
        restMatchesMockMvc.perform(post("/api/matches")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(matches)))
            .andExpect(status().isCreated());

        // Validate the Matches in the database
        List<Matches> matchesList = matchesRepository.findAll();
        assertThat(matchesList).hasSize(databaseSizeBeforeCreate + 1);
        Matches testMatches = matchesList.get(matchesList.size() - 1);
        assertThat(testMatches.getLeftcompanyid()).isEqualTo(DEFAULT_LEFTCOMPANYID);
        assertThat(testMatches.getRightcompanyid()).isEqualTo(DEFAULT_RIGHTCOMPANYID);
    }

    @Test
    @Transactional
    public void createMatchesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = matchesRepository.findAll().size();

        // Create the Matches with an existing ID
        matches.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMatchesMockMvc.perform(post("/api/matches")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(matches)))
            .andExpect(status().isBadRequest());

        // Validate the Matches in the database
        List<Matches> matchesList = matchesRepository.findAll();
        assertThat(matchesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkLeftcompanyidIsRequired() throws Exception {
        int databaseSizeBeforeTest = matchesRepository.findAll().size();
        // set the field null
        matches.setLeftcompanyid(null);

        // Create the Matches, which fails.


        restMatchesMockMvc.perform(post("/api/matches")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(matches)))
            .andExpect(status().isBadRequest());

        List<Matches> matchesList = matchesRepository.findAll();
        assertThat(matchesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRightcompanyidIsRequired() throws Exception {
        int databaseSizeBeforeTest = matchesRepository.findAll().size();
        // set the field null
        matches.setRightcompanyid(null);

        // Create the Matches, which fails.


        restMatchesMockMvc.perform(post("/api/matches")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(matches)))
            .andExpect(status().isBadRequest());

        List<Matches> matchesList = matchesRepository.findAll();
        assertThat(matchesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMatches() throws Exception {
        // Initialize the database
        matchesRepository.saveAndFlush(matches);

        // Get all the matchesList
        restMatchesMockMvc.perform(get("/api/matches?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(matches.getId().intValue())))
            .andExpect(jsonPath("$.[*].leftcompanyid").value(hasItem(DEFAULT_LEFTCOMPANYID)))
            .andExpect(jsonPath("$.[*].rightcompanyid").value(hasItem(DEFAULT_RIGHTCOMPANYID)));
    }
    
    @Test
    @Transactional
    public void getMatches() throws Exception {
        // Initialize the database
        matchesRepository.saveAndFlush(matches);

        // Get the matches
        restMatchesMockMvc.perform(get("/api/matches/{id}", matches.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(matches.getId().intValue()))
            .andExpect(jsonPath("$.leftcompanyid").value(DEFAULT_LEFTCOMPANYID))
            .andExpect(jsonPath("$.rightcompanyid").value(DEFAULT_RIGHTCOMPANYID));
    }
    @Test
    @Transactional
    public void getNonExistingMatches() throws Exception {
        // Get the matches
        restMatchesMockMvc.perform(get("/api/matches/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMatches() throws Exception {
        // Initialize the database
        matchesRepository.saveAndFlush(matches);

        int databaseSizeBeforeUpdate = matchesRepository.findAll().size();

        // Update the matches
        Matches updatedMatches = matchesRepository.findById(matches.getId()).get();
        // Disconnect from session so that the updates on updatedMatches are not directly saved in db
        em.detach(updatedMatches);
        updatedMatches
            .leftcompanyid(UPDATED_LEFTCOMPANYID)
            .rightcompanyid(UPDATED_RIGHTCOMPANYID);

        restMatchesMockMvc.perform(put("/api/matches")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMatches)))
            .andExpect(status().isOk());

        // Validate the Matches in the database
        List<Matches> matchesList = matchesRepository.findAll();
        assertThat(matchesList).hasSize(databaseSizeBeforeUpdate);
        Matches testMatches = matchesList.get(matchesList.size() - 1);
        assertThat(testMatches.getLeftcompanyid()).isEqualTo(UPDATED_LEFTCOMPANYID);
        assertThat(testMatches.getRightcompanyid()).isEqualTo(UPDATED_RIGHTCOMPANYID);
    }

    @Test
    @Transactional
    public void updateNonExistingMatches() throws Exception {
        int databaseSizeBeforeUpdate = matchesRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMatchesMockMvc.perform(put("/api/matches")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(matches)))
            .andExpect(status().isBadRequest());

        // Validate the Matches in the database
        List<Matches> matchesList = matchesRepository.findAll();
        assertThat(matchesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMatches() throws Exception {
        // Initialize the database
        matchesRepository.saveAndFlush(matches);

        int databaseSizeBeforeDelete = matchesRepository.findAll().size();

        // Delete the matches
        restMatchesMockMvc.perform(delete("/api/matches/{id}", matches.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Matches> matchesList = matchesRepository.findAll();
        assertThat(matchesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
