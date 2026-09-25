"""Generated PDF: edit app/content/portfolio.json, not this document."""
import argparse
import json
from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--content', type=Path, default=ROOT / 'app/content/portfolio.json')
parser.add_argument('--output', type=Path)
args = parser.parse_args()
data = json.loads(args.content.read_text())
profile = data['profile']
output = args.output or ROOT / 'public' / data['site']['cvPath'].lstrip('/')
output.parent.mkdir(parents=True, exist_ok=True)
BLUE = colors.HexColor('#2457a6')
DARK = colors.HexColor('#24282e')
MUTED = colors.HexColor('#585f68')
styles = {
 'name': ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=24, leading=28, textColor=DARK, spaceAfter=7),
 'headline': ParagraphStyle('headline', fontName='Helvetica', fontSize=11, leading=15, textColor=BLUE, spaceAfter=8),
 'section': ParagraphStyle('section', fontName='Helvetica-Bold', fontSize=11, leading=15, textColor=BLUE, spaceBefore=15, spaceAfter=8, keepWithNext=True),
 'company': ParagraphStyle('company', fontName='Helvetica-Bold', fontSize=11, leading=14, textColor=DARK, spaceBefore=9, spaceAfter=3, keepWithNext=True),
 'meta': ParagraphStyle('meta', fontName='Helvetica', fontSize=8, leading=11, textColor=MUTED, spaceAfter=5, keepWithNext=True),
 'body': ParagraphStyle('body', fontName='Helvetica', fontSize=9, leading=13, textColor=DARK, spaceAfter=5),
 'bullet': ParagraphStyle('bullet', fontName='Helvetica', fontSize=8.5, leading=12, textColor=DARK, leftIndent=9, firstLineIndent=-9, spaceAfter=4),
 'small': ParagraphStyle('small', fontName='Helvetica', fontSize=8, leading=11, textColor=MUTED, spaceAfter=5),
}
def clean(text):
 return escape(text.replace('→',' to ').replace('≈','Approx. ').replace('–','-').replace('—','-').replace('’',"'"))
def p(text,style='body'):
 return Paragraph(clean(text),styles[style])
def section(text):return p(text.upper(),'section')
def footer(canvas, doc):
 canvas.saveState();canvas.setStrokeColor(colors.HexColor('#d8d8d2'));canvas.line(18*mm,15*mm,192*mm,15*mm)
 canvas.setFont('Helvetica',7);canvas.setFillColor(MUTED)
 canvas.drawString(18*mm,10*mm,profile['shortName']+' / '+profile['headline']);canvas.drawRightString(192*mm,10*mm,str(doc.page));canvas.restoreState()
work={w['id']:w for w in data['work']}
flow=[p(profile['name'],'name'),p(profile['headline'],'headline'),p(profile['location'],'small')]
links=[link for link in profile['socialLinks'] if link['kind'] in ['linkedin','github']]
links.append({'label':data['site']['url'].removeprefix('https://').rstrip('/'),'href':data['site']['url']})
flow.append(Paragraph(' &nbsp; | &nbsp; '.join(f'<link href="{escape(link["href"])}" color="#2457a6">{clean(link["href"].removeprefix("https://").rstrip("/"))}</link>' for link in links), styles['small']))
flow.extend([section('Profile'),p(profile['summary']),section('Selected impact')])
for id in data['featuredWork']:
 w=work[id]
 if w['metrics']:
  flow.append(p(' · '.join(m['label']+': '+m['value'] for m in w['metrics'])))
flow.append(section('Recent experience'))
for id in data['cv']['workIds']:
 w=work[id]
 if not w.get('story'):continue
 label=w['company'] + (' for '+w['client'] if w.get('client') else '')
 block=[p(label,'company'),p(w['role']+' | '+w['period'],'meta')]
 block.extend(p('- '+b,'bullet') for b in w['achievements'][:data['cv']['featuredBulletLimit']])
 flow.append(KeepTogether(block))
flow.extend([PageBreak(),p(profile['shortName'],'name'),p('Experience and expertise','headline'),section('Earlier experience')])
for id in data['cv']['workIds']:
 w=work[id]
 if w.get('story'):continue
 flow.append(KeepTogether([p(w['company'],'company'),p(w['role']+' | '+w['period'],'meta'),p(w['summary'])]+[p('- '+b,'bullet') for b in w['achievements'][:data['cv']['earlierBulletLimit']]]))
flow.append(section('Technical skills'))
for group in data['skillGroups']:
 flow.append(p(group['title']+': '+', '.join(group['skills'])))
flow.extend([section('Education'),p(profile['education']['degree']),p(profile['education']['institution']+' · '+profile['education']['location'],'small'),section('Languages'),p(' · '.join(item['language']+': '+item['proficiency'] for item in profile['spokenLanguages']))])
doc=SimpleDocTemplate(str(output),pagesize=A4,leftMargin=18*mm,rightMargin=18*mm,topMargin=17*mm,bottomMargin=21*mm,title=profile['name']+' - '+profile['headline'],author=profile['name'],subject='Generated from portfolio.json',invariant=1)
doc.build(flow,onFirstPage=footer,onLaterPages=footer)
print(output)
