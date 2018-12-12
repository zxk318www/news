// pages/diss/diss.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    maxtime: '',
    loadingHidden: false,
    id:'',
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      id: options.id
    })
    this.requestData(options.id,this.data.page)
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
    this.setData({
      page:1
    })
    this.requestData(this.data.id,this.data.page);
    console.log("到头部")
  },

  /**
   * 加载更多
   */
  bindscrolltolower: function () {
    console.log('到底部')
    this.setData({
      page: parseInt(this.data.page)+1
    })
    //加载更多
    this.requestData(this.data.id,this.data.page);
  },
  requestData(id,page){
    var that = this;
    wx.request({
      url: 'http://api.budejie.com/api/api_open.php',
      data: {
        a: 'dataList',
        c: 'comment',
        data_id: id,
        page:page

      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        console.log('上一页', that.data.list)
        if(res.data.data){
          that.setData({
            // 拼接数组
            list: that.data.list.concat(res.data.data),
            loadingHidden: true,
          })
        }
      }
    })
  }
})