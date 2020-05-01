import { __decorate } from "tslib";
import { AfterContentInit, Directive, ElementRef, Input, NgModule, Renderer2, } from '@angular/core';
import { Angulartics2 } from './angulartics2-core';
let Angulartics2On = class Angulartics2On {
    constructor(elRef, angulartics2, renderer) {
        this.elRef = elRef;
        this.angulartics2 = angulartics2;
        this.renderer = renderer;
        this.angularticsProperties = {};
    }
    ngAfterContentInit() {
        this.renderer.listen(this.elRef.nativeElement, this.angulartics2On || 'click', (event) => this.eventTrack(event));
    }
    eventTrack(event) {
        const action = this.angularticsAction; // || this.inferEventName();
        const properties = Object.assign(Object.assign({}, this.angularticsProperties), { eventType: event.type });
        if (this.angularticsCategory) {
            properties.category = this.angularticsCategory;
        }
        if (this.angularticsLabel) {
            properties.label = this.angularticsLabel;
        }
        if (this.angularticsValue) {
            properties.value = this.angularticsValue;
        }
        this.angulartics2.eventTrack.next({
            action,
            properties,
        });
    }
};
Angulartics2On.ctorParameters = () => [
    { type: ElementRef },
    { type: Angulartics2 },
    { type: Renderer2 }
];
__decorate([
    Input('angulartics2On')
], Angulartics2On.prototype, "angulartics2On", void 0);
__decorate([
    Input()
], Angulartics2On.prototype, "angularticsAction", void 0);
__decorate([
    Input()
], Angulartics2On.prototype, "angularticsCategory", void 0);
__decorate([
    Input()
], Angulartics2On.prototype, "angularticsLabel", void 0);
__decorate([
    Input()
], Angulartics2On.prototype, "angularticsValue", void 0);
__decorate([
    Input()
], Angulartics2On.prototype, "angularticsProperties", void 0);
Angulartics2On = __decorate([
    Directive({ selector: '[angulartics2On]' })
], Angulartics2On);
export { Angulartics2On };
let Angulartics2OnModule = class Angulartics2OnModule {
};
Angulartics2OnModule = __decorate([
    NgModule({
        declarations: [Angulartics2On],
        exports: [Angulartics2On],
    })
], Angulartics2OnModule);
export { Angulartics2OnModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcnRpY3MyT24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFydGljczIvIiwic291cmNlcyI6WyJhbmd1bGFydGljczJPbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLGdCQUFnQixFQUNoQixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFDTCxRQUFRLEVBQ1IsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUduRCxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBU3pCLFlBQ1UsS0FBaUIsRUFDakIsWUFBMEIsRUFDMUIsUUFBbUI7UUFGbkIsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUNqQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBTHBCLDBCQUFxQixHQUFRLEVBQUUsQ0FBQztJQU1yQyxDQUFDO0lBRUwsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFDeEIsSUFBSSxDQUFDLGNBQWMsSUFBSSxPQUFPLEVBQzlCLENBQUMsS0FBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUN6QyxDQUFDO0lBQ0osQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFZO1FBQ3JCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLDRCQUE0QjtRQUNuRSxNQUFNLFVBQVUsbUNBQ1gsSUFBSSxDQUFDLHFCQUFxQixLQUM3QixTQUFTLEVBQUUsS0FBSyxDQUFDLElBQUksR0FDdEIsQ0FBQztRQUVGLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQzVCLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1NBQ2hEO1FBQ0QsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7U0FDMUM7UUFDRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN6QixVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztTQUMxQztRQUVELElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztZQUNoQyxNQUFNO1lBQ04sVUFBVTtTQUNYLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FXRixDQUFBOztZQTdDa0IsVUFBVTtZQUNILFlBQVk7WUFDaEIsU0FBUzs7QUFWSjtJQUF4QixLQUFLLENBQUMsZ0JBQWdCLENBQUM7c0RBQXdCO0FBQ3ZDO0lBQVIsS0FBSyxFQUFFO3lEQUEyQjtBQUMxQjtJQUFSLEtBQUssRUFBRTsyREFBNkI7QUFDNUI7SUFBUixLQUFLLEVBQUU7d0RBQTBCO0FBQ3pCO0lBQVIsS0FBSyxFQUFFO3dEQUEwQjtBQUN6QjtJQUFSLEtBQUssRUFBRTs2REFBaUM7QUFQOUIsY0FBYztJQUQxQixTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQztHQUMvQixjQUFjLENBdUQxQjtTQXZEWSxjQUFjO0FBNkQzQixJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFvQjtDQUFHLENBQUE7QUFBdkIsb0JBQW9CO0lBSmhDLFFBQVEsQ0FBQztRQUNSLFlBQVksRUFBRSxDQUFDLGNBQWMsQ0FBQztRQUM5QixPQUFPLEVBQUUsQ0FBQyxjQUFjLENBQUM7S0FDMUIsQ0FBQztHQUNXLG9CQUFvQixDQUFHO1NBQXZCLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE5nTW9kdWxlLFxuICBSZW5kZXJlcjIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5ndWxhcnRpY3MyIH0gZnJvbSAnLi9hbmd1bGFydGljczItY29yZSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1thbmd1bGFydGljczJPbl0nIH0pXG5leHBvcnQgY2xhc3MgQW5ndWxhcnRpY3MyT24gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoJ2FuZ3VsYXJ0aWNzMk9uJykgYW5ndWxhcnRpY3MyT246IHN0cmluZztcbiAgQElucHV0KCkgYW5ndWxhcnRpY3NBY3Rpb246IHN0cmluZztcbiAgQElucHV0KCkgYW5ndWxhcnRpY3NDYXRlZ29yeTogc3RyaW5nO1xuICBASW5wdXQoKSBhbmd1bGFydGljc0xhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGFuZ3VsYXJ0aWNzVmFsdWU6IHN0cmluZztcbiAgQElucHV0KCkgYW5ndWxhcnRpY3NQcm9wZXJ0aWVzOiBhbnkgPSB7fTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgYW5ndWxhcnRpY3MyOiBBbmd1bGFydGljczIsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXG4gICkgeyB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKFxuICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgdGhpcy5hbmd1bGFydGljczJPbiB8fCAnY2xpY2snLFxuICAgICAgKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5ldmVudFRyYWNrKGV2ZW50KSxcbiAgICApO1xuICB9XG5cbiAgZXZlbnRUcmFjayhldmVudDogRXZlbnQpIHtcbiAgICBjb25zdCBhY3Rpb24gPSB0aGlzLmFuZ3VsYXJ0aWNzQWN0aW9uOyAvLyB8fCB0aGlzLmluZmVyRXZlbnROYW1lKCk7XG4gICAgY29uc3QgcHJvcGVydGllczogYW55ID0ge1xuICAgICAgLi4udGhpcy5hbmd1bGFydGljc1Byb3BlcnRpZXMsXG4gICAgICBldmVudFR5cGU6IGV2ZW50LnR5cGUsXG4gICAgfTtcblxuICAgIGlmICh0aGlzLmFuZ3VsYXJ0aWNzQ2F0ZWdvcnkpIHtcbiAgICAgIHByb3BlcnRpZXMuY2F0ZWdvcnkgPSB0aGlzLmFuZ3VsYXJ0aWNzQ2F0ZWdvcnk7XG4gICAgfVxuICAgIGlmICh0aGlzLmFuZ3VsYXJ0aWNzTGFiZWwpIHtcbiAgICAgIHByb3BlcnRpZXMubGFiZWwgPSB0aGlzLmFuZ3VsYXJ0aWNzTGFiZWw7XG4gICAgfVxuICAgIGlmICh0aGlzLmFuZ3VsYXJ0aWNzVmFsdWUpIHtcbiAgICAgIHByb3BlcnRpZXMudmFsdWUgPSB0aGlzLmFuZ3VsYXJ0aWNzVmFsdWU7XG4gICAgfVxuXG4gICAgdGhpcy5hbmd1bGFydGljczIuZXZlbnRUcmFjay5uZXh0KHtcbiAgICAgIGFjdGlvbixcbiAgICAgIHByb3BlcnRpZXMsXG4gICAgfSk7XG4gIH1cblxuICAvKnByaXZhdGUgaXNDb21tYW5kKCkge1xuICAgIHJldHVybiBbJ2E6JywgJ2J1dHRvbjonLCAnYnV0dG9uOmJ1dHRvbicsICdidXR0b246c3VibWl0JywgJ2lucHV0OmJ1dHRvbicsICdpbnB1dDpzdWJtaXQnXS5pbmRleE9mKFxuICAgICAgZ2V0RE9NKCkudGFnTmFtZSh0aGlzLmVsKS50b0xvd2VyQ2FzZSgpICsgJzonICsgKGdldERPTSgpLnR5cGUodGhpcy5lbCkgfHwgJycpKSA+PSAwO1xuICB9XG5cbiAgcHJpdmF0ZSBpbmZlckV2ZW50TmFtZSgpIHtcbiAgICBpZiAodGhpcy5pc0NvbW1hbmQoKSkgcmV0dXJuIGdldERPTSgpLmdldFRleHQodGhpcy5lbCkgfHwgZ2V0RE9NKCkuZ2V0VmFsdWUodGhpcy5lbCk7XG4gICAgcmV0dXJuIGdldERPTSgpLmdldFByb3BlcnR5KHRoaXMuZWwsICdpZCcpIHx8IGdldERPTSgpLmdldFByb3BlcnR5KHRoaXMuZWwsICduYW1lJykgfHwgZ2V0RE9NKCkudGFnTmFtZSh0aGlzLmVsKTtcbiAgfSovXG59XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW0FuZ3VsYXJ0aWNzMk9uXSxcbiAgZXhwb3J0czogW0FuZ3VsYXJ0aWNzMk9uXSxcbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhcnRpY3MyT25Nb2R1bGUge31cbiJdfQ==