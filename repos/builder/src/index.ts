import { StepRunner, BuildStep } from "./step";
import { AppBuildBuildStep } from "./steps/app_build";
import { BackendBuildBuildStep } from "./steps/backend_build";
import { BackendCleanBuildStep } from "./steps/backend_clean";
import { BackendInstallBuildStep } from "./steps/backend_install";
import { DesktopBuildBuildStep } from "./steps/desktop_build";
import { DesktopCleanBuildStep } from "./steps/desktop_clean";
import { DesktopCopyResourcesBuildStep } from "./steps/desktop_copy_resources";
import { DesktopInstallBuildStep } from "./steps/desktop_install";
import { FrontendBuildBuildStep } from "./steps/frontend_build";
import { FrontendCleanBuildStep } from "./steps/frontend_clean";
import { FrontendInstallBuildStep } from "./steps/frontend_install";
import { MicroserviceFsBuildBuildStep } from "./steps/microservice_fs_build";

const steps: (new () => BuildStep)[] = [
  BackendCleanBuildStep,
  FrontendCleanBuildStep,
  DesktopCleanBuildStep,

  BackendInstallBuildStep,
  FrontendInstallBuildStep,
  DesktopInstallBuildStep,

  BackendBuildBuildStep,
  MicroserviceFsBuildBuildStep,
  FrontendBuildBuildStep,
  DesktopBuildBuildStep,

  DesktopCopyResourcesBuildStep,

  AppBuildBuildStep,
];

await new StepRunner(steps).runAll();
