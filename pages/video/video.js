// pages/video/video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    maxtime: '',
    loadingHidden: false,
    curr_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestData('newlist');
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
    wx.Video
  },

  /**
   * 视频格式出错
   */
  error: function (e) {
    console.log("视频出错")
    console.log(e.detail);
  },
  wait(){
    console.log("视频加载中")
  },
  playVideo(e){
    console.log("播放视频")
    this.setData({
      curr_id: e.currentTarget.dataset.id
    })
  },
  hide(){
    this.setData({
      curr_id:''
    })
    console.log("播放结束")
  },
  /**
   * 上拉刷新
   */
  bindscrolltoupper: function () {
    //加载最新
    this.requestData('newlist');
    console.log("到头部")
    this.setData({
      curr_id:''
    })
  },

  /**
   * 加载更多
   */
  bindscrolltolower: function () {
    console.log('到底部')
    //加载更多
    this.requestData('list');
    this.setData({
      curr_id:''
    })
  },

  /**
   * 加载数据
   */
  requestData: function (a) {
    var that = this;
    wx.request({
      url: 'http://api.budejie.com/api/api_open.php',
      data: {
        a: a,
        c: 'data',
        // 上一页的maxtime作为加载下一页的条件，
        maxtime: this.data.maxtime,
        type: '41',
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        console.log('上一页', that.data.list)
        that.setData({
          // 拼接数组
          list: that.data.list.concat(res.data.list),
          loadingHidden: true,
          maxtime: res.data.info.maxtime
        })

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