#!/usr/bin/env python3
"""Render the authoritative bundled DOCX to PDF without rewriting its content.
Requires python-docx and reportlab; run from the repository root.
"""
from pathlib import Path
from xml.sax.saxutils import escape
from docx import Document
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer

root = Path(__file__).resolve().parent.parent
source = root / 'public/cv/Felipe_de_Carvalho_Figueiredo_CV.docx'
target = source.with_suffix('.pdf')
font_dir = Path('/usr/share/fonts/truetype/dejavu')
for name, file in [('Body', 'DejaVuSans.ttf'), ('BodyBold', 'DejaVuSans-Bold.ttf'), ('Display', 'DejaVuSerif.ttf')]:
    pdfmetrics.registerFont(TTFont(name, str(font_dir / file)))
ink = colors.HexColor('#20372d')
body = ParagraphStyle('body', fontName='Body', fontSize=9, leading=12.5, textColor=ink, spaceAfter=7, alignment=TA_LEFT)
heading = ParagraphStyle('heading', parent=body, fontName='BodyBold', fontSize=9, leading=12, spaceBefore=15, spaceAfter=8, keepWithNext=True, textColor=colors.HexColor('#315f4d'))
name = ParagraphStyle('name', parent=body, fontName='Display', fontSize=24, leading=29, spaceAfter=10, keepWithNext=True)
contact = ParagraphStyle('contact', parent=body, fontSize=8, leading=12, spaceAfter=14)
role = ParagraphStyle('role', parent=body, fontName='BodyBold', spaceBefore=5, keepWithNext=True)
headings = {'EDUCATION','CLINICAL EXPERIENCE','RESEARCH EXPERIENCE','ONGOING PRIMARY RESEARCH','MANUSCRIPTS','ACCEPTED ABSTRACTS AND POSTER PRESENTATIONS','SUBMITTED ABSTRACTS','OPEN-SOURCE TOOL','TEACHING AND SERVICE','SKILLS'}

def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor('#cbd3c7'))
    canvas.line(45, 37, A4[0]-45, 37)
    canvas.setFont('Body', 7)
    canvas.setFillColor(colors.HexColor('#526059'))
    canvas.drawString(45, 25, 'Felipe C. Figueiredo | September 2026 CV')
    canvas.drawRightString(A4[0]-45, 25, str(doc.page))
    canvas.restoreState()

class WholeParagraph(Paragraph):
    def split(self, availWidth, availHeight):
        return []

story=[]
for i, para in enumerate(Document(source).paragraphs):
    text=para.text.strip()
    if not text: continue
    style = name if i == 0 else contact if i == 1 else heading if text in headings else role if ' | ' in text and not text.startswith(('•','Research:','Computational:')) else body
    safe=escape(text).replace('\n','<br/>').replace('\t',' &nbsp; ')
    if text.startswith('Selected first-author'):
        style = ParagraphStyle('intro', parent=body, keepWithNext=True)
    story.append(WholeParagraph(safe, style))
SimpleDocTemplate(str(target), pagesize=A4, rightMargin=45, leftMargin=45, topMargin=42, bottomMargin=50, title='Felipe C. Figueiredo — Curriculum Vitae', author='Felipe de Carvalho Figueiredo').build(story,onFirstPage=footer,onLaterPages=footer)
print(target)
