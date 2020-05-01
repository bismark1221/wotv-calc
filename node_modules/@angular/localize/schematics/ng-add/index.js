/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 *
 * @fileoverview Schematics for ng-new project that builds with Bazel.
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/schematics/ng-add", ["require", "exports", "tslib", "@angular-devkit/core", "@angular-devkit/schematics", "@schematics/angular/utility/config", "@schematics/angular/utility/project-targets", "@schematics/angular/utility/validation", "@schematics/angular/utility/workspace-models"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var core_1 = require("@angular-devkit/core");
    var schematics_1 = require("@angular-devkit/schematics");
    var config_1 = require("@schematics/angular/utility/config");
    var project_targets_1 = require("@schematics/angular/utility/project-targets");
    var validation_1 = require("@schematics/angular/utility/validation");
    var workspace_models_1 = require("@schematics/angular/utility/workspace-models");
    exports.localizePolyfill = "import '@angular/localize/init';";
    function getAllOptionValues(host, projectName, builderName, optionName) {
        var targets = project_targets_1.getProjectTargets(host, projectName);
        // Find all targets of a specific build in a project.
        var builderTargets = Object.values(targets).filter(function (target) { return target.builder === builderName; });
        // Get all options contained in target configuration partials.
        var configurationOptions = builderTargets.filter(function (t) { return t.configurations; })
            .map(function (t) { return Object.values(t.configurations); })
            .reduce(function (acc, cur) { return acc.concat.apply(acc, tslib_1.__spread(cur)); }, []);
        // Now we have all option sets. We can use it to find all references to a given property.
        var allOptions = tslib_1.__spread(builderTargets.map(function (t) { return t.options; }), configurationOptions);
        // Get all values for the option name and dedupe them.
        // Deduping will only work for primitives, but the keys we want here are strings so it's ok.
        var optionValues = allOptions.filter(function (o) { return o[optionName]; })
            .map(function (o) { return o[optionName]; })
            .reduce(function (acc, cur) { return !acc.includes(cur) ? acc.concat(cur) : acc; }, []);
        return optionValues;
    }
    function prendendToTargetOptionFile(projectName, builderName, optionName, str) {
        return function (host) {
            // Get all known polyfills for browser builders on this project.
            var optionValues = getAllOptionValues(host, projectName, builderName, optionName);
            optionValues.forEach(function (path) {
                var data = host.read(path);
                if (!data) {
                    // If the file doesn't exist, just ignore it.
                    return;
                }
                var content = core_1.virtualFs.fileBufferToString(data);
                if (content.includes(exports.localizePolyfill) ||
                    content.includes(exports.localizePolyfill.replace(/'/g, '"'))) {
                    // If the file already contains the polyfill (or variations), ignore it too.
                    return;
                }
                // Add string at the start of the file.
                var recorder = host.beginUpdate(path);
                recorder.insertLeft(0, str);
                host.commitUpdate(recorder);
            });
        };
    }
    function default_1(options) {
        return function (host) {
            options.name = options.name || config_1.getWorkspace(host).defaultProject;
            if (!options.name) {
                throw new Error('Please specify a project using "--name project-name"');
            }
            validation_1.validateProjectName(options.name);
            var localizeStr = "/***************************************************************************************************\n * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.\n */\n" + exports.localizePolyfill + "\n";
            return schematics_1.chain([
                prendendToTargetOptionFile(options.name, workspace_models_1.Builders.Browser, 'polyfills', localizeStr),
                prendendToTargetOptionFile(options.name, workspace_models_1.Builders.Server, 'main', localizeStr),
            ]);
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9sb2NhbGl6ZS9zY2hlbWF0aWNzL25nLWFkZC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7R0FRRzs7Ozs7Ozs7Ozs7OztJQUVILDZDQUErQztJQUMvQyx5REFBNkQ7SUFDN0QsNkRBQWdFO0lBQ2hFLCtFQUE4RTtJQUM5RSxxRUFBMkU7SUFDM0UsaUZBQWdIO0lBS25HLFFBQUEsZ0JBQWdCLEdBQUcsa0NBQWtDLENBQUM7SUFFbkUsU0FBUyxrQkFBa0IsQ0FDdkIsSUFBVSxFQUFFLFdBQW1CLEVBQUUsV0FBbUIsRUFBRSxVQUFrQjtRQUMxRSxJQUFNLE9BQU8sR0FBRyxtQ0FBaUIsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFckQscURBQXFEO1FBQ3JELElBQU0sY0FBYyxHQUFnRCxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FDN0YsVUFBQyxNQUErQyxJQUFLLE9BQUEsTUFBTSxDQUFDLE9BQU8sS0FBSyxXQUFXLEVBQTlCLENBQThCLENBQUMsQ0FBQztRQUV6Riw4REFBOEQ7UUFDOUQsSUFBTSxvQkFBb0IsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLGNBQWMsRUFBaEIsQ0FBZ0IsQ0FBQzthQUN2QyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxjQUFlLENBQUMsRUFBaEMsQ0FBZ0MsQ0FBQzthQUMxQyxNQUFNLENBQUMsVUFBQyxHQUFHLEVBQUUsR0FBRyxJQUFLLE9BQUEsR0FBRyxDQUFDLE1BQU0sT0FBVixHQUFHLG1CQUFXLEdBQUcsSUFBakIsQ0FBa0IsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUUvRSx5RkFBeUY7UUFDekYsSUFBTSxV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Ii8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKlxuICogQGZpbGVvdmVydmlldyBTY2hlbWF0aWNzIGZvciBuZy1uZXcgcHJvamVjdCB0aGF0IGJ1aWxkcyB3aXRoIEJhemVsLlxuICovXG5cbmltcG9ydCB7dmlydHVhbEZzfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQge2NoYWluLCBSdWxlLCBUcmVlfSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQge2dldFdvcmtzcGFjZX0gZnJvbSAnQHNjaGVtYXRpY3MvYW5ndWxhci91dGlsaXR5L2NvbmZpZyc7XG5pbXBvcnQge2dldFByb2plY3RUYXJnZXRzfSBmcm9tICdAc2NoZW1hdGljcy9hbmd1bGFyL3V0aWxpdHkvcHJvamVjdC10YXJnZXRzJztcbmltcG9ydCB7dmFsaWRhdGVQcm9qZWN0TmFtZX0gZnJvbSAnQHNjaGVtYXRpY3MvYW5ndWxhci91dGlsaXR5L3ZhbGlkYXRpb24nO1xuaW1wb3J0IHtCcm93c2VyQnVpbGRlclRhcmdldCwgQnVpbGRlcnMsIFNlcnZlQnVpbGRlclRhcmdldH0gZnJvbSAnQHNjaGVtYXRpY3MvYW5ndWxhci91dGlsaXR5L3dvcmtzcGFjZS1tb2RlbHMnO1xuXG5pbXBvcnQge1NjaGVtYX0gZnJvbSAnLi9zY2hlbWEnO1xuXG5cbmV4cG9ydCBjb25zdCBsb2NhbGl6ZVBvbHlmaWxsID0gYGltcG9ydCAnQGFuZ3VsYXIvbG9jYWxpemUvaW5pdCc7YDtcblxuZnVuY3Rpb24gZ2V0QWxsT3B0aW9uVmFsdWVzPFQ+KFxuICAgIGhvc3Q6IFRyZWUsIHByb2plY3ROYW1lOiBzdHJpbmcsIGJ1aWxkZXJOYW1lOiBzdHJpbmcsIG9wdGlvbk5hbWU6IHN0cmluZykge1xuICBjb25zdCB0YXJnZXRzID0gZ2V0UHJvamVjdFRhcmdldHMoaG9zdCwgcHJvamVjdE5hbWUpO1xuXG4gIC8vIEZpbmQgYWxsIHRhcmdldHMgb2YgYSBzcGVjaWZpYyBidWlsZCBpbiBhIHByb2plY3QuXG4gIGNvbnN0IGJ1aWxkZXJUYXJnZXRzOiAoQnJvd3NlckJ1aWxkZXJUYXJnZXR8U2VydmVCdWlsZGVyVGFyZ2V0KVtdID0gT2JqZWN0LnZhbHVlcyh0YXJnZXRzKS5maWx0ZXIoXG4gICAgICAodGFyZ2V0OiBCcm93c2VyQnVpbGRlclRhcmdldHxTZXJ2ZUJ1aWxkZXJUYXJnZXQpID0+IHRhcmdldC5idWlsZGVyID09PSBidWlsZGVyTmFtZSk7XG5cbiAgLy8gR2V0IGFsbCBvcHRpb25zIGNvbnRhaW5lZCBpbiB0YXJnZXQgY29uZmlndXJhdGlvbiBwYXJ0aWFscy5cbiAgY29uc3QgY29uZmlndXJhdGlvbk9wdGlvbnMgPSBidWlsZGVyVGFyZ2V0cy5maWx0ZXIodCA9PiB0LmNvbmZpZ3VyYXRpb25zKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKHQgPT4gT2JqZWN0LnZhbHVlcyh0LmNvbmZpZ3VyYXRpb25zISkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZWR1Y2UoKGFjYywgY3VyKSA9PiBhY2MuY29uY2F0KC4uLmN1ciksIFtdKTtcblxuICAvLyBOb3cgd2UgaGF2ZSBhbGwgb3B0aW9uIHNldHMuIFdlIGNhbiB1c2UgaXQgdG8gZmluZCBhbGwgcmVmZXJlbmNlcyB0byBhIGdpdmVuIHByb3BlcnR5LlxuICBjb25zdCBhbGxPcHRpb25zID0gW1xuICAgIC4uLmJ1aWxkZXJUYXJnZXRzLm1hcCh0ID0+IHQub3B0aW9ucyksXG4gICAgLi4uY29uZmlndXJhdGlvbk9wdGlvbnMsXG4gIF07XG5cbiAgLy8gR2V0IGFsbCB2YWx1ZXMgZm9yIHRoZSBvcHRpb24gbmFtZSBhbmQgZGVkdXBlIHRoZW0uXG4gIC8vIERlZHVwaW5nIHdpbGwgb25seSB3b3JrIGZvciBwcmltaXRpdmVzLCBidXQgdGhlIGtleXMgd2Ugd2FudCBoZXJlIGFyZSBzdHJpbmdzIHNvIGl0J3Mgb2suXG4gIGNvbnN0IG9wdGlvblZhbHVlczogVFtdID1cbiAgICAgIGFsbE9wdGlvbnMuZmlsdGVyKG8gPT4gb1tvcHRpb25OYW1lXSlcbiAgICAgICAgICAubWFwKG8gPT4gb1tvcHRpb25OYW1lXSlcbiAgICAgICAgICAucmVkdWNlKChhY2MsIGN1cikgPT4gIWFjYy5pbmNsdWRlcyhjdXIpID8gYWNjLmNvbmNhdChjdXIpIDogYWNjLCBbXSk7XG5cbiAgcmV0dXJuIG9wdGlvblZhbHVlcztcbn1cblxuXG5mdW5jdGlvbiBwcmVuZGVuZFRvVGFyZ2V0T3B0aW9uRmlsZShcbiAgICBwcm9qZWN0TmFtZTogc3RyaW5nLCBidWlsZGVyTmFtZTogc3RyaW5nLCBvcHRpb25OYW1lOiBzdHJpbmcsIHN0cjogc3RyaW5nKSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSkgPT4ge1xuICAgIC8vIEdldCBhbGwga25vd24gcG9seWZpbGxzIGZvciBicm93c2VyIGJ1aWxkZXJzIG9uIHRoaXMgcHJvamVjdC5cbiAgICBjb25zdCBvcHRpb25WYWx1ZXMgPSBnZXRBbGxPcHRpb25WYWx1ZXM8c3RyaW5nPihob3N0LCBwcm9qZWN0TmFtZSwgYnVpbGRlck5hbWUsIG9wdGlvbk5hbWUpO1xuXG4gICAgb3B0aW9uVmFsdWVzLmZvckVhY2gocGF0aCA9PiB7XG4gICAgICBjb25zdCBkYXRhID0gaG9zdC5yZWFkKHBhdGgpO1xuICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgIC8vIElmIHRoZSBmaWxlIGRvZXNuJ3QgZXhpc3QsIGp1c3QgaWdub3JlIGl0LlxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbnRlbnQgPSB2aXJ0dWFsRnMuZmlsZUJ1ZmZlclRvU3RyaW5nKGRhdGEpO1xuICAgICAgaWYgKGNvbnRlbnQuaW5jbHVkZXMobG9jYWxpemVQb2x5ZmlsbCkgfHxcbiAgICAgICAgICBjb250ZW50LmluY2x1ZGVzKGxvY2FsaXplUG9seWZpbGwucmVwbGFjZSgvJy9nLCAnXCInKSkpIHtcbiAgICAgICAgLy8gSWYgdGhlIGZpbGUgYWxyZWFkeSBjb250YWlucyB0aGUgcG9seWZpbGwgKG9yIHZhcmlhdGlvbnMpLCBpZ25vcmUgaXQgdG9vLlxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCBzdHJpbmcgYXQgdGhlIHN0YXJ0IG9mIHRoZSBmaWxlLlxuICAgICAgY29uc3QgcmVjb3JkZXIgPSBob3N0LmJlZ2luVXBkYXRlKHBhdGgpO1xuICAgICAgcmVjb3JkZXIuaW5zZXJ0TGVmdCgwLCBzdHIpO1xuICAgICAgaG9zdC5jb21taXRVcGRhdGUocmVjb3JkZXIpO1xuICAgIH0pO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zOiBTY2hlbWEpOiBSdWxlIHtcbiAgcmV0dXJuIChob3N0OiBUcmVlKSA9PiB7XG4gICAgb3B0aW9ucy5uYW1lID0gb3B0aW9ucy5uYW1lIHx8IGdldFdvcmtzcGFjZShob3N0KS5kZWZhdWx0UHJvamVjdDtcbiAgICBpZiAoIW9wdGlvbnMubmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2Ugc3BlY2lmeSBhIHByb2plY3QgdXNpbmcgXCItLW5hbWUgcHJvamVjdC1uYW1lXCInKTtcbiAgICB9XG4gICAgdmFsaWRhdGVQcm9qZWN0TmFtZShvcHRpb25zLm5hbWUpO1xuXG4gICAgY29uc3QgbG9jYWxpemVTdHIgPVxuICAgICAgICBgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogTG9hZCBcXGAkbG9jYWxpemVcXGAgb250byB0aGUgZ2xvYmFsIHNjb3BlIC0gdXNlZCBpZiBpMThuIHRhZ3MgYXBwZWFyIGluIEFuZ3VsYXIgdGVtcGxhdGVzLlxuICovXG4ke2xvY2FsaXplUG9seWZpbGx9XG5gO1xuXG4gICAgcmV0dXJuIGNoYWluKFtcbiAgICAgIHByZW5kZW5kVG9UYXJnZXRPcHRpb25GaWxlKG9wdGlvbnMubmFtZSwgQnVpbGRlcnMuQnJvd3NlciwgJ3BvbHlmaWxscycsIGxvY2FsaXplU3RyKSxcbiAgICAgIHByZW5kZW5kVG9UYXJnZXRPcHRpb25GaWxlKG9wdGlvbnMubmFtZSwgQnVpbGRlcnMuU2VydmVyLCAnbWFpbicsIGxvY2FsaXplU3RyKSxcbiAgICBdKTtcbiAgfTtcbn1cbiJdfQ==