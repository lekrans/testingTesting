/**
 * Load Speed History. This will load the history of vehicle speed
 *
 **/
(function () {
  function addSpeedHistoryHandlers() {
    // add infinite scroll on history
    const scrollEl = document.querySelector('.screen.send_history .body');
    // var loadMsg = document.querySelector('.screen.send_history .body .load_more_msg');
    scrollEl.addEventListener('scroll', (e) => {
      const el = e.target;
      const scrollPercentage = 100 * el.scrollTop / (el.scrollHeight - el.clientHeight);

      // if we're scrolled all the way, load more content
      if (scrollPercentage > 99) {
        // delay for visual effect
        setTimeout(loadMoreSpeedHistory, 500);
      }
    });
  }

  function loadMoreSpeedHistory(e) {
    const start_num = parseInt(document.getElementById('transaction_container').dataset.count);
    // console.log('loadMoreHistroy');
    // fetch the data via ajax call
    makeAjaxCall(`/history/${start_num}`, (resp) => {
      if (resp.status !== 200) return console.log('Error fetching history data.');
      resp = JSON.parse(resp.response);
      injectIntoDom(resp);
    });
  }

  // prep for dom insertion
  // inject into dom
  function injectIntoDom(data) {
    // console.log('data', data);
    const history_table = document.getElementById('transaction_container');
    const templ = document.getElementById('history_template').innerHTML;
    let output = '';

    for (let i = 0; i < data.length; i++) {
      // console.log('data[i]', data[i]);
      let row = templ;
      row = row.replace('$$date$$', data[i].date);
      row = row.replace('$$title$$', data[i].title);

      if (data[i].currency === 'USD') data[i].amount = `$${data[i].amount}`; // currency prefix
      row = row.replace('$$amount$$', data[i].amount);

      output += row;
    }

    if (data.length === 0) {
      document.getElementById('load_more').innerHTML = 'All out. No more history.';
      return;
    }

    // inject into dom
    const curr_data = history_table.innerHTML;
    history_table.innerHTML = curr_data + output;
    // update the row count
    history_table.dataset.count = parseInt(history_table.dataset.count) + data.length; // since i number of new rows were inserted
  }

  function makeAjaxCall(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState < 4) return;

      if (xhr.status !== 200) return;


      // all is well
      if (xhr.readyState === 4) cb(xhr);
    };

    xhr.open('GET', url, true);
    xhr.send('');
  }

  // init
  addSpeedHistoryHandlers();

  // load the first history dataset in
  loadMoreSpeedHistory(0);
}());
