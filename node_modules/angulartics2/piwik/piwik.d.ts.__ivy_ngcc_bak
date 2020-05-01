import { Angulartics2 } from 'angulartics2';
export declare class Angulartics2Piwik {
    private angulartics2;
    constructor(angulartics2: Angulartics2);
    startTracking(): void;
    pageTrack(path: string, location?: any): void;
    /**
     * Track a basic event in Piwik, or send an ecommerce event.
     *
     * @param action A string corresponding to the type of event that needs to be tracked.
     * @param properties The properties that need to be logged with the event.
     */
    eventTrack(action: string, properties?: any): void;
    setUsername(userId: string | boolean): void;
    /**
     * Sets custom dimensions if at least one property has the key "dimension<n>",
     * e.g. dimension10. If there are custom dimensions, any other property is ignored.
     *
     * If there are no custom dimensions in the given properties object, the properties
     * object is saved as a custom variable.
     *
     * If in doubt, prefer custom dimensions.
     * @link https://piwik.org/docs/custom-variables/
     */
    setUserProperties(properties: any): void;
    private setCustomDimensions;
}
