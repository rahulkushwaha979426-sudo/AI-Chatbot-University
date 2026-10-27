import express from 'express';
import { UNIVERSITY_INFO, KNOWLEDGE_TOPICS, findRelevantContext } from '../services/universityKnowledge.js';

const router = express.Router();

// GET GENERAL UNIVERSITY INFO
router.get('/info', (req, res) => {
  res.json({
    success: true,
    university: UNIVERSITY_INFO
  });
});

// GET ALL TOPICS OVERVIEW
router.get('/topics', (req, res) => {
  res.json({
    success: true,
    topics: KNOWLEDGE_TOPICS
  });
});

// GET SPECIFIC TOPIC BY KEY
router.get('/topics/:key', (req, res) => {
  const topic = KNOWLEDGE_TOPICS[req.params.key.toLowerCase()];
  if (!topic) {
    return res.status(404).json({ success: false, message: 'Topic not found.' });
  }
  res.json({ success: true, topic });
});

// SEARCH KNOWLEDGE BASE
router.get('/search', (req, res) => {
  const query = req.query.q || '';
  if (!query.trim()) {
    return res.json({ success: true, results: [] });
  }
  const results = findRelevantContext(query);
  res.json({ success: true, query, results });
});

// QUICK FAQS
router.get('/faqs', (req, res) => {
  res.json({
    success: true,
    faqs: KNOWLEDGE_TOPICS.faqs.details
  });
});

export default router;
