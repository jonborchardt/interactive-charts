import { ICompileProvider } from "angular";

export function configModule($compileProvider: ICompileProvider): void {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
}

configModule.$inject = ["$compileProvider"];