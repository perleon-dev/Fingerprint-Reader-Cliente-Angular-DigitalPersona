import { ChangeDetectorRef, input, Component, OnInit, OnDestroy, viewChild } from '@angular/core';

import { FingerprintReader,
  SampleFormat, 
  DeviceConnected, 
  DeviceDisconnected, 
  SamplesAcquired, 
  AcquisitionStarted, 
  AcquisitionStopped } from '@digitalpersona/devices';

  import './core/modules/WebSdk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'huellero6';

  listFP:any;
  infoFP:any;
  listSampleFP:any;
  currentIFP:any;

   reader: FingerprintReader;

  constructor() {
    this.reader = new FingerprintReader();
  }

  private OnDeviceConnected = (event:DeviceConnected)=>{}
  private OnDeviceDisconnected = (event:DeviceDisconnected)=>{}
  
  private OnAcquisitionStarted = (event:AcquisitionStarted)=>{
    console.log("OnAcquisitionStarted");
    console.log(event);
  }

  private OnAcquisitionStopped = (event:AcquisitionStopped)=>{
    console.log("OnAcquisitionStopped");
    console.log(event);
  }

  private OnSamplesAcquired = (event:SamplesAcquired)=>{
    console.log("OnSamplesAcquired");
    console.log(event);
    this.listSampleFP = event
  }

  ngOnInit(): void {
    this.reader = new FingerprintReader();
    this.reader.on("DeviceConnected", this.OnDeviceConnected);
    this.reader.on("DeviceDisconnected", this.OnDeviceDisconnected);
    this.reader.on("AcquisitionStarted", this.OnAcquisitionStarted);
    this.reader.on("AcquisitionStopped", this.OnAcquisitionStopped);
    this.reader.on("SamplesAcquired", this.OnSamplesAcquired);
  }

  ngOnDestroy(): void {
    this.reader.off("DeviceConnected", this.OnDeviceConnected);
    this.reader.off("DeviceDisconnected", this.OnDeviceDisconnected);
    this.reader.off("AcquisitionStarted", this.OnAcquisitionStarted);
    this.reader.off("AcquisitionStopped", this.OnAcquisitionStopped);
    this.reader.off("SamplesAcquired", this.OnSamplesAcquired);
  }

  listarDispositivos(){
    Promise.all([
      this.reader.enumerateDevices()
    ])
    .then(result =>{
      this.listFP = result[0];
      console.log("Dato dispositivos");
      console.log(this.listFP);
    })
    .catch(error =>{
      console.log(error);
    })
  }

   fini() {
  
    Promise.all([
      this.reader.startAcquisition(SampleFormat.Intermediate)
    ])
    .then(result =>{
      console.log("Dato dispositivos");
      console.log(result);
    })
    .catch(error =>{
      console.log(error);
    })
  }

  capturar(){
    this.reader.startAcquisition(SampleFormat.PngImage, "bee4e922-4ce2-47bf-a881-b72a6341a52a")
    .then(result =>{
      console.log("Dato capturado");
      console.log(result);
    })
    .catch(error =>{
      console.log(error);
    })

  }

}
