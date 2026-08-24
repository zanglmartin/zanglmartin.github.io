import type { CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "mobile-reliability",
    eyebrow: "Healthcare · Reliability",
    title: "Turning a fragile legacy app into reliable mobile software",
    summary:
      "A measured modernization program that improved stability, resource use, architecture, and testability without stopping feature delivery.",
    context:
      "At Swift Medical, I worked on a legacy Android application used in digital wound care and clinical imaging, while also contributing to a newer Flutter product.",
    challenge:
      "The application had severe stability problems, concurrency defects, memory leaks, and a monolithic architecture that made changes risky. It also had to work on constrained devices and unreliable networks.",
    approach: [
      "Used Perfetto and Android Profiler to identify concurrency problems, memory leaks, and CPU hotspots.",
      "Introduced behavioral unit tests before high-risk changes to make refactoring measurable.",
      "Led a staged migration from RxJava and MVP toward Kotlin Coroutines, MVVM, single source of truth, and unidirectional data flow.",
      "Introduced Jetpack Compose for new interface work while preserving staged interoperability.",
      "Improved offline synchronization and created low-overhead event buffering and batch delivery.",
    ],
    outcomes: [
      "Raised the crash-free rate from 70% to 99%.",
      "Reduced memory consumption by approximately 24%.",
      "Improved CPU utilization by approximately 33%.",
      "Established a safer path for ongoing modernization with improved observability and test coverage.",
    ],
    metrics: [
      { value: "70→99%", label: "Crash-free rate" },
      { value: "≈24%", label: "Lower memory use" },
      { value: "≈33%", label: "Better CPU use" },
    ],
    technologies: [
      "Kotlin", "Coroutines", "MVVM", "Jetpack Compose", "Room", "WorkManager",
      "Perfetto", "Android Profiler", "JUnit", "MockK",
    ],
    disclaimer:
      "This case study describes professional outcomes and engineering practices only. Proprietary code and confidential product details are not included.",
  },
  {
    slug: "payment-sdks",
    eyebrow: "Fintech · Developer SDKs",
    title: "Keeping payment SDK behavior aligned across platforms",
    summary:
      "Cross-platform delivery for a payment SDK spanning Android, iOS, and React Native, guided by API documentation, TDD, and platform consistency.",
    context:
      "As a Parser contractor for Checkout.com, I contributed to Flow, its payment SDK for Android, iOS, and React Native.",
    challenge:
      "Payment methods and card schemes evolve across multiple native and cross-platform packages. Releases must keep platform behavior and dependency versions aligned while preserving a stable developer experience.",
    approach: [
      "Investigated and fixed issues across Android, React Native, and iOS SDKs.",
      "Implemented Android support for additional payment methods and card schemes.",
      "Worked from product and API documentation using TDD and technical development documentation.",
      "Collaborated with engineers across platforms to keep behavior consistent.",
      "Prepared and delivered React Native releases that aligned underlying native dependencies.",
    ],
    outcomes: [
      "Delivered two React Native releases updating Android and iOS SDK dependencies.",
      "Expanded Android payment-method and card-scheme support.",
      "Contributed fixes across all three supported platform surfaces.",
    ],
    metrics: [{ value: "3", label: "Platform surfaces" }, { value: "2", label: "React Native releases" }],
    technologies: [
      "Kotlin", "Android SDK", "Swift", "iOS SDK", "React Native",
      "TypeScript", "TDD", "Payment SDKs",
    ],
    disclaimer:
      "This case study describes professional outcomes and engineering practices only. Proprietary code and confidential product details are not included.",
  },
  {
    slug: "fintech-architecture",
    eyebrow: "Fintech · Architecture",
    title: "Reusable architecture for wallet and credit-card experiences",
    summary:
      "Mobile architecture, reusable components, and testing systems designed to support complex fintech flows across large organizations.",
    context:
      "At PayPal and MercadoLibre, I worked on wallet and virtual credit-card capabilities where correctness, reuse, and cross-team delivery were central.",
    challenge:
      "Large fintech organizations need mobile flows that keep business state predictable, remain testable, and integrate cleanly with libraries and teams outside a single feature area.",
    approach: [
      "Applied MVVM/MVI, SOLID, single source of truth, and unidirectional data flow to end-to-end feature modules.",
      "Led migrations toward Kotlin Coroutines and reactive business logic.",
      "Owned reusable UI components consumed across MercadoLibre product verticals.",
      "Expanded unit, integration, and automated end-to-end testing with coverage reporting in CI.",
      "Instrumented product metrics and improved Gradle and library-distribution pipelines.",
    ],
    outcomes: [
      "Delivered reusable wallet and virtual credit-card flows.",
      "Improved confidence through broader automated test coverage.",
      "Supported cross-team consumption through reusable components and maintainable distribution.",
    ],
    metrics: [
      { value: "E2E", label: "Automated delivery coverage" },
      { value: "UDF", label: "Predictable state flow" },
    ],
    technologies: [
      "Kotlin", "MVVM", "MVI", "Coroutines", "Dagger/Hilt", "Jetpack",
      "JUnit", "JaCoCo", "Jenkins", "Datadog",
    ],
    disclaimer:
      "This case study combines related, publicly shareable experience themes. Proprietary code and confidential product details are not included.",
  },
];

export function getCaseStudy(slug: string | undefined) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}
