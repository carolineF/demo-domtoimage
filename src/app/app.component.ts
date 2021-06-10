import { Component } from '@angular/core';
import domtoimage from 'dom-to-image';
import html2canvas from 'html2canvas';

interface Product {
  name: string;
  title: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imageList: Array<string> = [];
  currentName: string | undefined = 'test1';
  products = [
    { name: 'test1', title: '这是第一条' },
    { name: 'test2', title: '这是第二条' },
    { name: 'test3', title: '这是第三条' },
  ];

  ngAfterViewInit() {
    let productNodes = document.getElementsByClassName('page-container');
    console.log(productNodes)
    
    Array.from(productNodes as any).forEach((node: any) => {
      let options = {
        scale: 1,
        canvas: document.createElement("canvas"),
        width: node.offsetWidth,
        height: node.offsetHeight,
        taintTest: true, //在渲染前测试图片
        useCORS: true, //貌似与跨域有关，但和allowTaint不能共存
        dpi: window.devicePixelRatio, // window.devicePixelRatio是设备像素比
        background: "#fff"
    };
      // html2canvas(node, options).then((canvas: HTMLCanvasElement) => {
      //   var dataURL = canvas.toDataURL("image/png", 1.0);
      //   this.imageList.push(dataURL)
      // })
      domtoimage.toPng(node).then(dataUrl => {
        this.imageList.push(dataUrl)
      })
    });
  }

  onItemClick(name: string) {
    this.currentName = name;
  }
}
