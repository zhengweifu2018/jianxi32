<?php
/**
 * User: fun.zheng
 */

namespace Home\Controller;
use Think\Controller;

class JYController extends Controller {
    public function index() {
        $this->display();
    }

    public function getInitData() {
      $output = Array(
        'text_colors' => array(),
        'product_colors' => array(),
        'color_scheme_datas' => array(
          // array(describtion => '正常', img => '/jianxi32/Public/src/Home/jy/images/ps/normal.jpg'),
          // array(describtion => '素描', img => '/jianxi32/Public/src/Home/jy/images/ps/sketch.png'),
          // array(describtion => '美肤', img => '/jianxi32/Public/src/Home/jy/images/ps/softEnhancement.png'),
          // array(describtion => '素描', img => '/jianxi32/Public/src/Home/jy/images/ps/sketch.png'),
          // array(describtion => '美肤', img => '/jianxi32/Public/src/Home/jy/images/ps/softEnhancement.png'),
          // array(describtion => '素描', img => '/jianxi32/Public/src/Home/jy/images/ps/sketch.png')
        )
      );

      $color_datas = M('color')->select();

      $m_product = M('product');
      $jx_2d_datas = $m_product->where('title="jx_2d"')->select()[0];
      $jx_2d_other = $jx_2d_datas['other'];
      $this->assign("jx_2d_paras_json", $jx_2d_other);

      $jx_2d_other_array = json_decode($jx_2d_other, true);

      foreach ($color_datas as $c_data) {
          if(in_array($c_data["id"], $jx_2d_other_array["jx_2d"]["text_colors"])) {
              array_push($output['text_colors'], $c_data);
          }

          if(in_array($c_data["id"], $jx_2d_other_array["jx_2d"]["product_colors"])) {
              array_push($output['product_colors'], $c_data);
          }
      }

      echo json_encode($output);
    }

    public function test() {
      // var_dump(json_decode(file_get_contents('php://input')));
      // var_dump(curl_file_get_contents('http://www.janexi.com/Home/JY/getInitData'));
      // var_dump(curl_file_get_contents('http://www.baidu.com'));
      // var_dump(curl_post('http://www.janexi.com/Home/JY/getInitData', 'name=zhengweifu&age=30'));
      var_dump(curl_post('http://www.janexi.com/Home/JY/getInitData', array(
        'name' => 'fun.zheng',
        'age' => 30
      )));
    }
}
