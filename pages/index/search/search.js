let timeId = null;
Page({
  data: {
    history: [],
    hot: ['聚餐春游', '舞会K歌', '团建联谊'],
    result: [],
    showKeywords: false,
    keywords: [],
    value: '',
    showResult: false,
  },
  cancelSearch() {
    this.setData({
      showResult: false,
      showKeywords: false,
      value: ''
    })
  },
  searchContentSet(e) {
    this.setData({
      value: e.detail.value
    })
  },
  searchContent(e) {
    var that = this;
    console.log(this.data.value);
    this.historyHandle(this.data.value);
    wx.request({
      url: 'http://localhost:8080/applet/activity/search',
      data: {
        searchText: that.data.value
      },
      success: function (res) {
        var act = res.data.extend.act;
        //   console.log(act);
        if (Array.prototype.isPrototypeOf(act)) {
          that.setData({
            'result.length': 0
          });
        }
        act.forEach((item, index) => {
          that.setData({
            ['result[' + index + ']']: item,
            ['result[' + index + '].url']: '../../takePart/takePart?actId=' + item.actId
          });
        })
        that.setData({
          showResult: true
        });

      }
    })
    if (!that.data.value) {
      this.setData({
        showKeywords: false
      })
    } else {
      if (!this.data.showKeywords) {
        timeId && clearTimeout(timeId);
        timeId = setTimeout(() => {
          this.setData({
            showKeywords: true
          })
        }, 1000)
      }
    }
  },
  keywordHandle(e) {
    const text = e.target.dataset.text;
    this.setData({
      value: text,
      showKeywords: false,
      showResult: true
    })
    this.searchContent(e);
    this.historyHandle(text);
  },
  historyHandle(value) {
    let history = this.data.history;
    const idx = history.indexOf(value);
    if (idx === -1) {
      // 搜索记录只保留8个
      if (history.length > 7) {
        history.pop();
      }
    } else {
      history.splice(idx, 1);
    }
    history.unshift(value);
    wx.setStorageSync('history', JSON.stringify(history));
    this.setData({
      history
    });
  },
  onLoad() {
    const history = wx.getStorageSync('history');
    if (history) {
      this.setData({
        history: JSON.parse(history)
      })
      console.log(this.data.history);
    }
  }
})