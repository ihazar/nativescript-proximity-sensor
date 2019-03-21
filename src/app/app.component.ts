import { Component } from "@angular/core";

import * as application from "tns-core-modules/application";
import * as platform from 'tns-core-modules/platform';

//declare var android: any;

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html"
})
export class AppComponent {
    private SensorManager: any;
    private proximitySensorListener: android.hardware.SensorEventListener;
    private proximitySensor: any;
    public proximityValue = 0;


    registerProximityListener() {

        console.log('registerProximityListener started');
    
        // SensorManager = android.os.SensorManager;
        // sensorManager = application.android.context.getSystemService(android.content.Context.SENSOR_SERVICE);
        // proximitySensor = sensorManager.getDefaultSensor(8);
    
        // Get android context and Sensor Manager object
        const activity: android.app.Activity = application.android.startActivity || application.android.foregroundActivity;
        this.SensorManager = activity.getSystemService(android.content.Context.SENSOR_SERVICE) as android.hardware.SensorManager;
    
        // Creating listener
        this.proximitySensorListener = new android.hardware.SensorEventListener({
            onAccuracyChanged: (sensor, accuracy) => {
                console.log('Sensor ' + sensor + ' accuracy has changed to ' + accuracy);
            },
            onSensorChanged: (event) => {
                console.log('Sensor value changed to: ' + event.values[0]);
                this.proximityValue = (event.values[0]);
                const HR = event.values[0].toString().split('.')[0];
                // HR is the BPM from the sensor here
            }
        });
    
        // Get the sensor
        this.proximitySensor = this.SensorManager.getDefaultSensor(
            android.hardware.Sensor.TYPE_PROXIMITY
        );
    
        // Register the listener
        const didRegListener = this.SensorManager.registerListener(
            this.proximitySensorListener,
            this.proximitySensor,
            android.hardware.SensorManager.SENSOR_DELAY_NORMAL
        );
    
        console.log('Registering listener: ' + didRegListener);
    }

    logProximityValue() {
        console.log('Proximity: '+this.proximityValue);
    }

    unRegisterProximityListener() {
        console.log('Prox listener: ' + this.proximitySensorListener);
         let res = this.SensorManager.unregisterListener( this.proximitySensorListener);
         this.proximitySensorListener = undefined;
         console.log('unRegistering listener: ' + res);
    };

}
