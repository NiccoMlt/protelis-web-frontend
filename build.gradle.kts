@file:Suppress("UnstableApiUsage")

import com.moowork.gradle.node.yarn.YarnTask

plugins {
  id("com.github.node-gradle.node") version "2.2.4"
}

node {
  version = "10.18.1"
  yarnVersion = "1.17.0"
  download = true
}

tasks {
  val reactBuild by creating(YarnTask::class) {
    args = listOf("build")

    inputs.files(
      "package.json", // React package configuration
      "yarn.lock", // dependencies lockfile
      "tsconfig.json" // TypeScript config
    ).withPathSensitivity(PathSensitivity.RELATIVE)
    inputs.dir(
      "src" // React sources
    ).withPathSensitivity(PathSensitivity.RELATIVE)
    inputs.dir(
      fileTree("node_modules") // Node modules ...
        .exclude(".cache") // ... ignoring cache
    ).withPathSensitivity(PathSensitivity.RELATIVE)

    outputs.dir("build")
    outputs.cacheIf { true }

    dependsOn("yarn")
  }

  create<YarnTask>("jest") {
    setEnvironment(mapOf("CI" to "true"))
    args = listOf("test")
    dependsOn("yarn")
  }
}
