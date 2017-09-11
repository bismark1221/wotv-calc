import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { TooltipComponent } from "./tooltip.component";
import { TooltipDirective } from "./tooltip.directive";

@NgModule({
    imports: [BrowserModule],
    declarations: [TooltipComponent, TooltipDirective],
    exports: [TooltipComponent, TooltipDirective],
    entryComponents: [TooltipComponent]
})
export class TooltipModule { }
