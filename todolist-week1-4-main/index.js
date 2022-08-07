// TODO: 使用者可以新增待辦事項
const addNewTodo = () => {
  // 檢查 input 有沒有值
  var value = $('#todo').val()
  if (!value) {
    alert('請填寫待辦事項')
    return
  }
    
  // 取得使用者填寫的值
  //const value = $('#todo').val()
  
  // 插入資料
  $('.todolist__item').append(`<li class="no-completed">
    <input class="todolist__input" type="checkbox" />
    <span>${value}</span>
    <a class="delete" href="#">
      <i class="fa fa-x"></i>
    </a>
  </li>`)

  // 清除代辦
  $('#todo').val('')
}

// 更新已完成項目
const updateCompletedCount = () => {
  const count = $('.todolist__item').find('.completed').length
  $('.todolist__info').find('a').text(count);
}

// TODO: 使用者可以刪除待辦事項
const deleteTodo = (e) => {
  console.log(e)
$(e.target).parent().closest('li').remove()
}

// TODO: 清除已完成項目
const clearCompletedTodo = () => { 
  $('.todolist__item').find('.completed').fadeOut(500, () => {
    // 找到 completed 的待辦事項，並移除 .completed class
    $('.todolist__item').find('.completed').remove()

    // 更新已完成項目
    // 抓出 .todolist__item 待辦事項的 .completed class 數量
    // 用 jQuery text() 方式更新 html 已完成 [數字] 項目
    const count = $('.todolist__item').find('.completed').length
    $('.todolist__info').find('a').text(count)

  })

}

// 監聽
$(() => {
  // TODO: 每一條代辦事項 delete 監聽 click 事件
  $('.todolist__item').on('click', '.delete', (e) => deleteTodo(e))
  

  // 狀態：全部、待完成、已完成
  $('.todolist__tabs li').each(function () {
    $(this).click(function () {
      $(this).siblings().find('a').removeClass('active')
      $(this).find('a').addClass('active')
    })
  })

  // TODO: 使用者可以將待辦事項設定成已完成
  // 步驟一：監聽每一個 todo list，前面 checkbox 有被點擊時執行 Function
  // 每條待辦事項加上 class completed, no-completed
  // $('.todolist__item li').on('click', 'input', (e) =>
  $('.todolist__item').on('click', 'li input', (e) => {
    const li = $(e.target).parent()

    if (li.hasClass('completed')) {
      li.removeClass('completed')
      li.addClass('no-completed')
    } else {
      li.removeClass('no-completed')
      li.addClass('completed')
    }

    // 更新已完成項目
    const count = $('.todolist__item').find('.completed').length
    $('.todolist__info').find('a').text(count)

  })
  
  // 篩選全部
  $('.todolist__tabs').on('click', '.all', () => {
    $('.todolist__item').children().show()
  })

  // TODO: 篩選待完成
  $('.todolist__tabs').on('click', '.no-completed', () => {
    $('.todolist__item').find('.completed').hide()
    $('.todolist__item').find('.no-completed').show()
  })
  // TODO: 篩選已完成
  $('.todolist__tabs').on('click', '.completed', () => {
    $('.todolist__item').find('.completed').show()
    $('.todolist__item').find('.no-completed').hide()
  })

})