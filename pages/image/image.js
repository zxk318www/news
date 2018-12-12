// pages/image/image.js
var detail = '../detail/detail'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[],
      maxtime: '',
      loadingHidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestData('newlist')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },
  /**
   * 上拉刷新
   */
  bindscrolltoupper: function () {
    //加载最新
    this.requestData('newlist');
    console.log("到头部")
  },

  /**
   * 加载更多
   */
  bindscrolltolower: function () {
    console.log('到底部')
    //加载更多
    this.requestData('list');
  },
 /**
   * 查看大图
   */
  lookBigPicture: function (e) {
   
    
    let urls = []
    urls.push(e.currentTarget.dataset.url)
    wx.previewImage({
      // current: 'String', // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: urls
      
    })
    // //获取图片高度 对应wxml中data-height="{{item.height}}"
    // var height = e.currentTarget.dataset.height;
    // //获取图片高度 对应wxml中data-width="{{item.width}}"
    // var width = e.currentTarget.dataset.width;
    // // 传参方式向GET请求
    // wx.navigateTo({
    //   url: detail + '?' + 'url=' + url + "&height=" + height + "&width=" + width,
    //   success: function (res) {
    //     console.log(res)
    //   },
    //   fail: function (err) {
    //     console.log(err)
    //   },
    // })
  },
  requestData(a){
    var that = this
    wx.request({
      url: 'http://api.budejie.com/api/api_open.php',
      data: {
        a: a,
        c: 'data',
        //上一页的maxtime作为加载下一页的条件
        maxtime: that.data.maxtime,
        type: '10'
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        that.setData({
          list: that.data.list.concat(res.data.list),
          loadingHidden: true,
          maxtime: res.data.info.maxtime
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  goDis(e){
    console.log("taolun:"+e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../diss/diss?id=${id}`,
    })
  }
})