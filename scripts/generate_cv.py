from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageTemplate,
    Paragraph,
    Spacer,
)

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "cv" / "martin-zangl-cv-2026.pdf"
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

PAGE_WIDTH, PAGE_HEIGHT = A4
GREEN = colors.HexColor("#08783F")
DARK = colors.HexColor("#152019")
MUTED = colors.HexColor("#52635A")
LINE = colors.HexColor("#CFDDD4")
LIGHT = colors.HexColor("#F5FAF7")


class PortfolioCV(BaseDocTemplate):
    def __init__(self, filename: Path):
        super().__init__(
            str(filename),
            pagesize=A4,
            leftMargin=18 * mm,
            rightMargin=18 * mm,
            topMargin=18 * mm,
            bottomMargin=16 * mm,
            title="Martin Ignacio Zangl - Senior Android and Mobile Engineer",
            author="Martin Ignacio Zangl",
            subject="Professional CV",
        )
        frame = Frame(
            self.leftMargin,
            self.bottomMargin,
            self.width,
            self.height,
            leftPadding=0,
            rightPadding=0,
            topPadding=0,
            bottomPadding=0,
        )
        self.addPageTemplates(PageTemplate(id="cv", frames=[frame], onPage=self.draw_page))

    def draw_page(self, canvas, doc):
        canvas.saveState()
        canvas.setFillColor(GREEN)
        canvas.rect(0, 0, 4 * mm, PAGE_HEIGHT, fill=1, stroke=0)
        canvas.setStrokeColor(LINE)
        canvas.line(18 * mm, 13 * mm, PAGE_WIDTH - 18 * mm, 13 * mm)
        canvas.setFillColor(MUTED)
        canvas.setFont("Helvetica", 7.5)
        canvas.drawString(18 * mm, 8.5 * mm, "MARTIN ZANGL  /  SENIOR ANDROID & MOBILE ENGINEER")
        canvas.drawRightString(PAGE_WIDTH - 18 * mm, 8.5 * mm, f"{doc.page}")
        canvas.restoreState()


styles = getSampleStyleSheet()
styles.add(
    ParagraphStyle(
        name="Name",
        parent=styles["Title"],
        fontName="Helvetica-Bold",
        fontSize=25,
        leading=28,
        textColor=DARK,
        spaceAfter=3 * mm,
        alignment=TA_LEFT,
    )
)
styles.add(
    ParagraphStyle(
        name="Role",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=11,
        leading=14,
        textColor=GREEN,
        spaceAfter=2 * mm,
    )
)
styles.add(
    ParagraphStyle(
        name="Contact",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.5,
        leading=12,
        textColor=MUTED,
        spaceAfter=6 * mm,
    )
)
styles.add(
    ParagraphStyle(
        name="Section",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=12,
        leading=15,
        textColor=DARK,
        borderColor=GREEN,
        borderWidth=0,
        borderPadding=0,
        spaceBefore=5 * mm,
        spaceAfter=2.5 * mm,
        keepWithNext=True,
    )
)
styles.add(
    ParagraphStyle(
        name="Company",
        parent=styles["Heading3"],
        fontName="Helvetica-Bold",
        fontSize=10,
        leading=12,
        textColor=DARK,
        spaceBefore=2.7 * mm,
        spaceAfter=0.5 * mm,
        keepWithNext=True,
    )
)
styles.add(
    ParagraphStyle(
        name="Meta",
        parent=styles["Normal"],
        fontName="Helvetica-Oblique",
        fontSize=8.2,
        leading=10,
        textColor=GREEN,
        spaceAfter=1.4 * mm,
        keepWithNext=True,
    )
)
styles.add(
    ParagraphStyle(
        name="BodySmall",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=8.4,
        leading=11.2,
        textColor=DARK,
        spaceAfter=1.5 * mm,
    )
)
styles.add(
    ParagraphStyle(
        name="BulletSmall",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=8.2,
        leading=10.7,
        textColor=DARK,
        leftIndent=3.8 * mm,
        firstLineIndent=-2.8 * mm,
        bulletIndent=0,
        spaceAfter=0.8 * mm,
    )
)
styles.add(
    ParagraphStyle(
        name="Tech",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=7.8,
        leading=10,
        textColor=MUTED,
        spaceBefore=0.8 * mm,
        spaceAfter=1.8 * mm,
    )
)
styles.add(
    ParagraphStyle(
        name="Skill",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=8.4,
        leading=11.2,
        textColor=DARK,
        leftIndent=3.5 * mm,
        firstLineIndent=-3.5 * mm,
        spaceAfter=1.4 * mm,
    )
)


def section(title):
    return Paragraph(f'<font color="#08783F">/</font>&nbsp;&nbsp;{title.upper()}', styles["Section"])


def experience(company, role, period, summary, bullets, technologies, client=None):
    label = company if not client else f"{company} <font color='#52635A'>for {client}</font>"
    flow = [
        Paragraph(label, styles["Company"]),
        Paragraph(f"{role} &nbsp;&nbsp;|&nbsp;&nbsp; {period}", styles["Meta"]),
        Paragraph(summary, styles["BodySmall"]),
    ]
    for bullet in bullets:
        flow.append(Paragraph(f"•&nbsp; {bullet}", styles["BulletSmall"]))
    flow.append(Paragraph(f"<b>Technologies:</b> {technologies}", styles["Tech"]))
    return KeepTogether(flow)


story = [
    Paragraph("Martin Ignacio Zangl", styles["Name"]),
    Paragraph("Senior Android Engineer  |  Senior Mobile Engineer", styles["Role"]),
    Paragraph(
        'Valencia, Spain &nbsp;&nbsp;•&nbsp;&nbsp; '
        '<link href="https://www.linkedin.com/in/martinzangl/" color="#08783F">linkedin.com/in/martinzangl</link>'
        ' &nbsp;&nbsp;•&nbsp;&nbsp; '
        '<link href="https://github.com/mizangl" color="#08783F">github.com/mizangl</link>',
        styles["Contact"],
    ),
    section("Professional summary"),
    Paragraph(
        "Senior Software Engineer with 15+ years building mobile products and developer-facing SDKs "
        "for companies including PayPal, MercadoLibre, Checkout.com, and Swift Medical. Specialist "
        "in Android and cross-platform delivery with strong experience in architectural modernization, "
        "performance optimization, testing culture, and mentoring. Product-oriented and customer-focused, "
        "with a record of delivering complex domains at scale.",
        styles["BodySmall"],
    ),
    section("Selected impact"),
    Paragraph(
        "<b>Reliability:</b> improved crash-free performance from 70% to 99%. &nbsp;&nbsp; "
        "<b>Efficiency:</b> reduced memory use by approximately 24% and improved CPU utilization "
        "by approximately 33%. &nbsp;&nbsp; <b>Delivery:</b> shipped mobile products and SDKs across "
        "Android, iOS, Flutter, and React Native.",
        styles["BodySmall"],
    ),
    section("Professional experience"),
    experience(
        "Parser",
        "Senior Mobile Engineer",
        "Dec 2025 - Jul 2026",
        "Contracted to Checkout.com and contributed to Flow, its payment SDK across Android, iOS, and React Native.",
        [
            "Investigated and fixed defects across Android, React Native, and iOS SDKs.",
            "Developed Android support for new payment methods and card schemes.",
            "Delivered two React Native releases aligning the underlying Android and iOS SDK dependencies.",
            "Worked from product and API documentation using TDD and technical development documentation.",
            "Collaborated across platforms to keep SDK behavior consistent.",
        ],
        "Kotlin, Android SDK, Swift, iOS SDK, React Native, TypeScript, TDD, payment SDKs",
        client="Checkout.com",
    ),
    experience(
        "Swift Medical",
        "Senior Android Engineer",
        "Mar 2023 - Oct 2025",
        "Led technical transformation of a legacy Android application and contributed to a Flutter product for digital wound care and clinical imaging.",
        [
            "Raised the crash-free rate from 70% to 99% by resolving concurrency issues and memory leaks.",
            "Reduced memory consumption by approximately 24% and improved CPU utilization by approximately 33% using Perfetto and Android Profiler.",
            "Migrated a monolithic codebase from RxJava and MVP toward Coroutines, MVVM, single source of truth, unidirectional data flow, and Jetpack Compose.",
            "Designed a low-resource analytics collector with offline buffering, batching, and reliable delivery.",
            "Improved offline synchronization reliability and expanded WorkManager test coverage.",
            "Built cross-platform camera infrastructure using CameraX, AVFoundation, image conversion, exposure controls, and image-processing improvements.",
            "Built native libraries for iPhone Simulator arm64 and an iOS Simulator mock camera for automated testing.",
        ],
        "Kotlin, Java, Compose, Coroutines, MVVM, Room, WorkManager, Flutter, Dart, Swift, OpenCV, CameraX, Perfetto, JUnit, MockK, FHIR",
    ),
    experience(
        "PayPal",
        "Senior Android Engineer",
        "Nov 2021 - Jan 2023",
        "Developed PayPal Wallet modules with a focus on reusable architecture, testability, and cross-team collaboration.",
        [
            "Built end-to-end wallet modules using MVVM/MVI, SOLID, single source of truth, and unidirectional data flow.",
            "Led refactors toward Kotlin Coroutines and reactive architecture.",
            "Expanded unit, integration, and automated end-to-end coverage and integrated reporting into CI.",
            "Improved Gradle pipelines and cross-team library distribution.",
        ],
        "Android Jetpack, Kotlin, Dagger/Hilt, Coroutines, Java, Jenkins, SonarQube, JaCoCo, Android tests, Splunk",
    ),
    experience(
        "MercadoLibre",
        "Senior Android Engineer",
        "Apr 2020 - Nov 2021",
        "Led virtual credit-card features and reusable UI components within a large e-commerce and fintech platform.",
        [
            "Architected complete virtual credit-card flows using a single source of truth and unidirectional data flow.",
            "Owned a reusable UI component library consumed across product verticals.",
            "Collaborated with backend, middle-end, and iOS teams.",
            "Instrumented Datadog metrics for key monetization KPIs.",
        ],
        "Android SDK, Jetpack, Kotlin, Coroutines, Java, Swift, Datadog, New Relic, Apache Spark, CI/CD",
    ),
    experience(
        "Santex America",
        "Senior Android Engineer",
        "May 2015 - Apr 2020",
        "Delivered mobile products across IoT, social, education, and gaming domains.",
        [
            "Led Android development across an IoT e-bike platform, a CEO network, and a multi-university student portal.",
            "Contributed to Words with Friends, a consumer product with 50M users.",
            "Implemented automated CI builds and improved build times with scripting.",
            "Organized onboarding and technical workshops on RxJava and Clean Architecture.",
        ],
        "Android, Java, Kotlin, Jetpack, JavaScript, Dart, Flutter, React Native, Objective-C, Swift, Firebase, Jenkins, CI/CD",
    ),
    experience(
        "Globant",
        "Semi-Senior Android Engineer",
        "May 2014 - May 2015",
        "Delivered native Android solutions for enterprise clients including BBVA and JPMorgan Chase.",
        [
            "Migrated legacy mobile web applications to native Android.",
            "Built a multithreaded conference-room booking application with timezone synchronization.",
            "Maintained platform tooling and a secure internal app-distribution platform.",
        ],
        "Android Studio, Java, Dagger, Jenkins, Apache Cordova, Git, Jira",
    ),
    experience(
        "Taller Technologies",
        "Android Engineer",
        "Mar 2013 - May 2014",
        "Contributed to Intel Context Aware middleware SDK and real-time retail solutions.",
        [
            "Developed Android components for the Intel Context Aware middleware SDK.",
            "Implemented an XMPP-based electronic price-tag client and internal tooling.",
            "Built migration tooling using Node.js.",
        ],
        "Android, Java, XMPP, Node.js",
    ),
    experience(
        "Self-Employed",
        "Software Engineer",
        "Sep 2005 - Mar 2010",
        "Built custom software for small businesses and prototyped embedded and mobile products.",
        [
            "Delivered Java Swing desktop applications, a photo-order system, and an ERP solution.",
            "Engineered an IoT taximeter integrating Arduino sensors, GPS, and a custom Android client.",
        ],
        "Java, Swing, Android, Arduino, GPS, IoT",
    ),
    section("Technical skills"),
    Paragraph("<b>Mobile:</b> Android (Kotlin, Java), Jetpack Compose, CameraX, WorkManager, Room, Coroutines, Flow; Flutter/Dart; iOS (Swift, Objective-C basics); React Native.", styles["Skill"]),
    Paragraph("<b>Architecture:</b> MVVM, MVI, MVP, Clean Architecture, SOLID, single source of truth, unidirectional data flow.", styles["Skill"]),
    Paragraph("<b>Concurrency:</b> Kotlin Coroutines, Flow, RxJava.", styles["Skill"]),
    Paragraph("<b>Testing:</b> TDD, JUnit, MockK, Turbine, Mockito, Espresso, UI Automator, integration and end-to-end testing, JaCoCo.", styles["Skill"]),
    Paragraph("<b>APIs and backend:</b> REST, Retrofit, OkHttp, mTLS, certificate pinning, Apache Spark, Node.js, Java EE, Ktor, AWS S3.", styles["Skill"]),
    Paragraph("<b>Data:</b> Room, Realm, SQLite, DataStore, offline-first synchronization, Firebase Storage and Realtime Database.", styles["Skill"]),
    Paragraph("<b>DevOps and observability:</b> Gradle, GitHub Actions, GitLab CI, Jenkins, CircleCI, Fastlane, SonarQube, Detekt, KTlint, Crashlytics, Datadog, New Relic.", styles["Skill"]),
    Paragraph("<b>Domains:</b> Fintech, payments, healthcare, FHIR, medical-device constraints, IoT, Bluetooth LE, and Arduino.", styles["Skill"]),
    section("Languages"),
    Paragraph("<b>Spanish:</b> Native &nbsp;&nbsp;•&nbsp;&nbsp; <b>English:</b> Full professional &nbsp;&nbsp;•&nbsp;&nbsp; <b>German:</b> Limited working &nbsp;&nbsp;•&nbsp;&nbsp; <b>Italian:</b> Limited working", styles["BodySmall"]),
    section("Education"),
    Paragraph("<b>B.S. Information Systems Engineering</b><br/>National Technological University, Córdoba, Argentina", styles["BodySmall"]),
    Spacer(1, 2 * mm),
    Paragraph("Public portfolio: <link href='https://zanglmartin.github.io/' color='#08783F'>zanglmartin.github.io/zanglmartin</link>", styles["BodySmall"]),
]

doc = PortfolioCV(OUTPUT)
doc.build(story)
print(OUTPUT)
