import React from 'react';

import ProductNumber from './ProductNumber';

import Grid from '../../../Common/components/Grid';

import GridList from '../../../Common/components/GridList';

import SvgIcon from '../../../Common/components/SvgIcon';

import { heart } from '../../../Common/svgIcons/janexi/Basic';

import { CYAN500, GREY500 } from '../../../Common/styles/colors';

import ProductHeaderPanel from './ProductHeaderPanel';

import CreateNodePanel  from './CreateNodePanel';

import BuyerShowPanel from './BuyerShowPanel';

import PopupGroup from './PopupGroup';

import ImageItem from '../../../Common/components/ImageItem';

import ColorItem from '../../../Common/components/ColorItem';

import GeneralPropertiesPanel from './GeneralPropertiesPanel';

import TextPropertiesPanel from './TextPropertiesPanel';

import ColorSchemesPanel from './ColorSchemesPanel';

import NodePanel from './NodePanel';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { setGeneralPanelVisible, setTextPanelVisible, setImgPanelVisible, setNodeActiveIndex,
         setGeneralPanelProps, setTextPanelProps, setImgPanelProps} from '../actions';

import fabric from 'fabric';

import { GetActiveObjectProps } from '../core';

// console.log(PatternLibrariesPanel.getWrappedInstance());
import { AddText } from '../core'; 
class App extends React.Component {
  componentDidMount() {
    console.log('componentDidMount');

    window.JYCANVAS = new fabric.Canvas('viewport-2d', {
      width: this.props.canvasWidth,
      height: this.props.canvasHeight
    });
    // AddText('mynameiszhengweifu');
    window.JYCANVAS.on({
      'object:selected': options => {
        // console.log('selected: ', options);
        // console.log(GetActiveObjectProps());

        let currentObject = options.target;

        let nodeId  = currentObject.mid;
        let aId = this.props.nodeData.items.findIndex(item => item.id === nodeId);
        this.props.setNodeActiveIndex(aId);
        let props = GetActiveObjectProps();
        switch (currentObject.type) {
          case 'curvedText':
            this.props.setImgPanelVisible(false);
            this.props.setGeneralPanelVisible(true);
            this.props.setTextPanelVisible(true);
            this.props.setGeneralPanelProps(props.generalProps);
            this.props.setTextPanelProps(props.textProps);
            break;
          default:
        }


      },

      'selection:cleared': options => {
        // console.log('unselected: ', options);
        this.props.setNodeActiveIndex(-1);

        this.props.setImgPanelVisible(false);
        this.props.setGeneralPanelVisible(false);
        this.props.setTextPanelVisible(false);
      }
    });
  }

  render() {
    const heartSvg = <SvgIcon 
      style={{margin: '0px 2px 0px 2px'}}
      color={this.props.tangerine}
      width={14} height={14} 
      viewBox='0 0 512 512' >
      <path d={heart} />
    </SvgIcon>;
    return (
      <div style={{width: this.props.canvasWidth + this.props.controllerWidth + 15, margin: 'auto'}}>
        <div style={{
          float: 'left'}}>
          <canvas
            id='viewport-2d'
            style={{
              width: this.props.canvasWidth,
              height: this.props.canvasHeight,
              border: `1px solid ${this.props.grayeee}`,
              boxSizing: 'border-box'}}></canvas>

          <div style={{width: '50%', margin: 'auto'}}>
            <GridList
              cellHeight={100}
              cols={3}>
              <ImageItem
                defaultBorderColor={this.props.grayeee}
                activeColor={this.props.tangerine}
                img='/jianxi32/Public/src/Home/jy/images/tx01.jpg'/>
              <ImageItem
                defaultBorderColor={this.props.grayeee}
                activeColor={this.props.tangerine}
                img='/jianxi32/Public/src/Home/jy/images/tx01.jpg'/>
              <ImageItem
                defaultBorderColor={this.props.grayeee}
                activeColor={this.props.tangerine}
                img='/jianxi32/Public/src/Home/jy/images/tx01.jpg'/>
            </GridList>
          </div>
          <BuyerShowPanel items={[1, 2, 3, 4, 5, 6]}/>
        </div>
        <div style={{
          float: 'left',
          marginLeft: 15,
          width: this.props.controllerWidth}}>
          <ProductHeaderPanel bgColor={this.props.tangerine} productDescribtion='AIR100000000圆领 女款'/>

          <div>
            <span style={{
              marginRight: 10,
              fontSize: 25,
              color: this.props.tangerine}}>
              $59
            </span>
            {heartSvg}
            {heartSvg}
            {heartSvg}
            {heartSvg}
            {heartSvg}
            <span style={{
              padding: '0px 20px 0px 5px',
              fontSize: 16,
              color: this.props.tangerine}}>4.7</span>
            <span>(
              <a >96个评价</a>
            )</span>
          </div>

          <div style={{marginTop: 10}}></div>

          <GridList gutter={35}>
            <ProductNumber />
            <GridList cols={5}>
              <div style={{color: GREY500, lineHeight: '24px', height: 24, verticalAlign: 'middle'}}>颜色</div>
              <ColorItem width={24} height={24}/> 
            </GridList>
          </GridList>
          <div style={{marginTop: 10}}></div>
          <CreateNodePanel bgColor={this.props.tangerine} fbColor={this.props.grayeee}/>
          <div style={{marginTop: 10}}></div>
          <PopupGroup items={[
            {title: '一般属性', height: 310, visible: this.props.generalPanelVisible, content: <GeneralPropertiesPanel />, zDepth: 8},
            {title: '文字属性', height: 310, visible: this.props.textPanelVisible, content: <TextPropertiesPanel />, zDepth: 4},
            {title: '色彩风格', height: 310, visible: this.props.imgPanelVisible, content: <ColorSchemesPanel />, zDepth: 4},
            {title: '节点面板', height: 310, visible: true, content: <NodePanel />, zDepth: 1}
          ]}/>
        </div>
      </div>
    );
  }
}

App.defaultProps = {
  tangerine: '#ff8d5c',
  grayeee: '#eee',
  canvasWidth: 600,
  canvasHeight: 425,
  controllerWidth: 400,
  controllerHeight: 800
};

App.propTypes = {
  tangerine: React.PropTypes.string,
  grayeee: React.PropTypes.string,
  canvasWidth: React.PropTypes.number,
  canvasHeight: React.PropTypes.number,
  controllerWidth:React.PropTypes.number,
  controllerHeight: React.PropTypes.number
};

function mapStateToProps(state) {
  return {
    generalPanelVisible: state.generalPanelData.visible,
    textPanelVisible: state.textPanelData.visible,
    imgPanelVisible: state.imgPanelData.visible,
    nodeData: state.nodeData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setGeneralPanelVisible,
    setTextPanelVisible,
    setImgPanelVisible,
    setGeneralPanelProps,
    setTextPanelProps,
    setImgPanelProps,
    setNodeActiveIndex
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
