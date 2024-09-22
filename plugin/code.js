// code.js

figma.showUI(__html__, { width: 320, height: 480 });

// 接收来自 UI 的消息
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'insert-icon') {
    const { svgData, layerName } = msg;

    // 创建一个 SVG 节点
    const svgNode = figma.createNodeFromSvg(svgData);
    
    // 获取当前选中的节点
    const selection = figma.currentPage.selection;

    if (selection.length > 0) {
      // 如果有选中的节点，将新图标添加到选中节点内部
      const parentNode = selection[0]; // 取第一个选中的节点
      parentNode.appendChild(svgNode);
      svgNode.name = layerName; // 设置图层名称
      
      // 可选：将新图标定位在选中节点的中心
      svgNode.x = parentNode.width / 2 - svgNode.width / 2; // X轴居中
      svgNode.y = parentNode.height / 2 - svgNode.height / 2; // Y轴居中
    } else {
      // 如果没有选中的节点，直接添加到当前页面
      figma.currentPage.appendChild(svgNode);
      svgNode.name = layerName; // 设置图层名称
      svgNode.x = figma.viewport.center.x; // 将图标放置在视口中心
      svgNode.y = figma.viewport.center.y; // 将图标放置在视口中心
    }

    // 滚动并缩放到视图中
    figma.viewport.scrollAndZoomIntoView([svgNode]);
  }
};
