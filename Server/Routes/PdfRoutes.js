import express from 'express';
import { generatePdf } from '../Controller/PdfController.js';

const router = express.Router();

router.post('/generate', generatePdf);

export default router;
