import type { Experience } from "./types";

export const experiences: Experience[] = [
  {
    company: "Parser",
    client: "Checkout.com",
    role: "Senior Mobile Engineer",
    period: "Dec 2025 - Jul 2026",
    summary:
      "Contributed to Flow, Checkout.com's payment SDK across Android, iOS, and React Native.",
    achievements: [
      "Investigated and fixed defects across Android, React Native, and iOS SDKs.",
      "Delivered Android support for new payment methods and card schemes.",
      "Shipped two React Native releases aligning the underlying Android and iOS SDK dependencies.",
      "Worked from product and API documentation with TDD and technical development documentation.",
      "Collaborated across platforms to keep SDK behavior consistent.",
    ],
    technologies: [
      "Kotlin", "Android SDK", "Swift", "iOS SDK", "React Native", "TypeScript",
      "TDD", "SDK development", "Payment methods",
    ],
    featured: true,
  },
  {
    company: "Swift Medical",
    role: "Senior Android Engineer",
    period: "Mar 2023 - Oct 2025",
    summary:
      "Led technical transformation of a legacy Android application and contributed to a Flutter product for digital wound care and clinical imaging.",
    achievements: [
      "Raised crash-free performance from 70% to 99% by resolving concurrency issues and memory leaks.",
      "Reduced memory consumption by approximately 24% and improved CPU utilization by approximately 33% using Perfetto and Android Profiler.",
      "Migrated a monolithic codebase from RxJava and MVP toward Kotlin Coroutines, MVVM, single source of truth, unidirectional data flow, and Jetpack Compose.",
      "Designed a low-resource analytics collector with offline buffering, batching, and reliable delivery.",
      "Improved offline synchronization reliability and added WorkManager test coverage.",
      "Built cross-platform camera infrastructure with CameraX, AVFoundation, native image conversion, exposure controls, and image-processing improvements.",
      "Built native libraries for iPhone Simulator arm64 and an iOS Simulator mock camera used in automated testing.",
    ],
    technologies: [
      "Kotlin", "Java", "Jetpack Compose", "Coroutines", "MVVM", "Room",
      "WorkManager", "Flutter", "Dart", "Swift", "OpenCV", "CameraX", "Perfetto",
      "JUnit", "MockK", "FHIR",
    ],
    featured: true,
  },
  {
    company: "PayPal",
    role: "Senior Android Engineer",
    period: "Nov 2021 - Jan 2023",
    summary:
      "Developed PayPal Wallet modules with a focus on reusable architecture, testability, and cross-team collaboration.",
    achievements: [
      "Built end-to-end wallet modules using MVVM/MVI, SOLID, single source of truth, and unidirectional data flow.",
      "Led refactors to Kotlin Coroutines and reactive architecture.",
      "Expanded unit, integration, and automated end-to-end test coverage and integrated coverage reporting into CI.",
      "Improved Gradle pipelines and cross-team library distribution.",
    ],
    technologies: [
      "Android Jetpack", "Kotlin", "Dagger/Hilt", "Coroutines", "Java",
      "Jenkins", "SonarQube", "JaCoCo", "Android tests", "Splunk",
    ],
    featured: true,
  },
  {
    company: "MercadoLibre",
    role: "Senior Android Engineer",
    period: "Apr 2020 - Nov 2021",
    summary:
      "Led virtual credit-card features and reusable UI components within a large e-commerce and fintech platform.",
    achievements: [
      "Architected complete virtual credit-card flows with a single source of truth and unidirectional data flow.",
      "Owned a reusable UI components library consumed across product verticals.",
      "Collaborated with backend, middle-end, and iOS teams.",
      "Instrumented Datadog metrics for monetization KPIs.",
    ],
    technologies: [
      "Android SDK", "Jetpack", "Kotlin", "Coroutines", "Java", "Swift",
      "Datadog", "New Relic", "Apache Spark", "CI/CD",
    ],
    featured: true,
  },
  {
    company: "Santex America",
    role: "Senior Android Engineer",
    period: "May 2015 - Apr 2020",
    summary:
      "Delivered mobile products across IoT, social, education, and gaming, including contributions to Words with Friends.",
    achievements: [
      "Led Android development across an IoT e-bike platform, a CEO network, and a multi-university student portal.",
      "Contributed to Words with Friends, a consumer product with 50M users.",
      "Implemented automated CI builds and improved build times with scripting.",
      "Organized onboarding and workshops on RxJava and Clean Architecture.",
    ],
    technologies: [
      "Android", "Java", "Kotlin", "JavaScript", "Dart", "Flutter",
      "React Native", "Objective-C", "Swift", "Firebase", "Jenkins", "CI/CD",
    ],
  },
  {
    company: "Globant",
    role: "Semi-Senior Android Engineer",
    period: "May 2014 - May 2015",
    summary:
      "Delivered native Android solutions for enterprise clients including BBVA and JPMorgan Chase.",
    achievements: [
      "Migrated legacy mobile web applications to native Android.",
      "Built a multithreaded conference-room booking app with complex timezone synchronization.",
      "Maintained client-side platform tooling and a secure internal app-distribution platform.",
    ],
    technologies: ["Android Studio", "Java", "Dagger", "Jenkins", "Apache Cordova", "Git", "Jira"],
  },
  {
    company: "Taller Technologies",
    role: "Android Engineer",
    period: "Mar 2013 - May 2014",
    summary:
      "Contributed to Intel Context Aware middleware SDK and real-time retail solutions.",
    achievements: [
      "Developed Android components for the Intel Context Aware middleware SDK.",
      "Implemented an XMPP-based electronic price-tag client and internal tooling.",
      "Built internal migration tooling using Node.js.",
    ],
    technologies: ["Android", "Java", "XMPP", "Node.js"],
  },
  {
    company: "Self-Employed",
    role: "Software Engineer",
    period: "Sep 2005 - Mar 2010",
    summary:
      "Built custom software for small businesses and prototyped embedded and mobile products.",
    achievements: [
      "Delivered Java Swing desktop applications, a photo-order system, and an ERP solution.",
      "Engineered an IoT taximeter integrating Arduino sensors, GPS, and a custom Android client.",
    ],
    technologies: ["Java", "Swing", "Android", "Arduino", "GPS", "IoT"],
  },
];
