import type { SkillGroup, SystemDesignTheme } from "./types";

export const skillGroups: SkillGroup[] = [
  {
    title: "Core mobile languages",
    level: "Primary",
    description: "The languages I use to lead Android delivery and modernization.",
    skills: ["Kotlin", "Java"],
  },
  {
    title: "Cross-platform delivery",
    level: "Applied",
    description: "Hands-on delivery across native and shared mobile stacks.",
    skills: ["Dart", "Swift", "TypeScript", "JavaScript"],
  },
  {
    title: "Platform breadth",
    level: "Supporting",
    description: "Supporting languages and environments used to bridge platform work.",
    skills: ["Objective-C", "Node.js", "Java EE", "Ktor", "Apache Spark"],
  },
  {
    title: "Mobile platform",
    level: "Tooling",
    description: "Libraries and runtimes used to build, test, and diagnose mobile systems.",
    skills: [
      "Android SDK", "Jetpack Compose", "Coroutines", "Flow", "CameraX",
      "WorkManager", "Room", "Flutter", "React Native", "AVFoundation",
    ],
  },
  {
    title: "Quality and delivery",
    level: "Tooling",
    description: "Practices that keep delivery observable and repeatable.",
    skills: [
      "TDD", "JUnit", "MockK", "Turbine", "Espresso", "UI Automator",
      "JaCoCo", "GitHub Actions", "GitLab CI", "Jenkins", "Fastlane",
    ],
  },
];

export const systemDesignThemes: SystemDesignTheme[] = [
  {
    id: "architecture-modernization",
    number: "01",
    title: "Architecture modernization",
    description:
      "Move legacy mobile systems toward testable, reactive architectures without stopping product delivery.",
    evidence:
      "Led staged migration from RxJava + MVP toward Coroutines + MVVM, single source of truth, UDF, and Compose.",
    technologies: ["MVVM", "MVI", "Clean Architecture", "SOLID", "Coroutines", "Flow"],
  },
  {
    id: "offline-first",
    number: "02",
    title: "Offline-first reliability",
    description:
      "Design synchronization and event delivery for intermittent networks and constrained devices.",
    evidence:
      "Built buffered, batched analytics delivery and improved WorkManager-backed offline synchronization.",
    technologies: ["Room", "WorkManager", "DataStore", "SQLite", "Reliable delivery"],
  },
  {
    id: "sdk-design",
    number: "03",
    title: "SDK and platform consistency",
    description:
      "Keep public behavior aligned across Android, iOS, Flutter, and React Native boundaries.",
    evidence:
      "Delivered payment SDK work and aligned native dependencies and behavior across three platforms.",
    technologies: ["Android SDK", "iOS SDK", "React Native", "TypeScript", "API design"],
  },
  {
    id: "performance",
    number: "04",
    title: "Performance and concurrency",
    description:
      "Diagnose the behavior users feel: crashes, memory pressure, CPU load, and concurrency defects.",
    evidence:
      "Improved crash-free performance from 70% to 99% while reducing measured memory and CPU usage.",
    technologies: ["Perfetto", "Android Profiler", "Coroutines", "Concurrency", "Memory analysis"],
  },
  {
    id: "quality",
    number: "05",
    title: "Testing and delivery systems",
    description:
      "Use behavioral tests and automated pipelines to make high-risk change safer and repeatable.",
    evidence:
      "Expanded unit, integration, end-to-end, and coverage reporting across legacy and wallet systems.",
    technologies: ["TDD", "JUnit", "MockK", "Espresso", "JaCoCo", "CI/CD"],
  },
  {
    id: "imaging",
    number: "06",
    title: "Camera and clinical imaging",
    description:
      "Build native camera infrastructure and image pipelines across device and simulator environments.",
    evidence:
      "Worked with CameraX, AVFoundation, NV21 conversion, exposure controls, OpenCV, and simulator tooling.",
    technologies: ["CameraX", "AVFoundation", "OpenCV", "TensorFlow Lite", "Image processing"],
  },
];
