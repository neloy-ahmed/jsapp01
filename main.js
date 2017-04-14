document.getElementById('issue_input_form').addEventListener('submit', save_issue);

function save_issue(e){
  var issue_desc = document.getElementById("issue_description_input").value;
  var issue_severity = document.getElementById("issue_severity_input").value;
  var issue_assigned_to = document.getElementById("issue_assigned_to_input").value;
  var issue_id = chance.guid();
  var issue_status = 'Open';

  var issue = {
    id: issue_id,
    description: issue_desc,
    severity: issue_severity,
    assigned_to: issue_assigned_to,
    status: issue_status
  }

//Insert issue in storing system
  if(localStorage.getItem('issues') == null){
    var issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }else{
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

//Reset the form
document.getElementById('issue_input_form').reset();

fetch_issues();

e.preventDefault();
}

function set_status_closed(id){
  var issues = JSON.parse(localStorage.getItem('issues'));
  for(var i = 0; i < issues.length; i++){
    if(issues[i].id == id){
      issues[i].status = "Closed";
    }
  }

//Update item in storage system
  localStorage.setItem('issues', JSON.stringify(issues));

  fetch_issues();
}

function delete_issue(id){

  var issues = JSON.parse(localStorage.getItem('issues'));
  for(var i = 0; i < issues.length; i++){
    if(issues[i].id == id){
      issues.splice(i, 1);
    }
  }

//Update item in storage system
  localStorage.setItem('issues', JSON.stringify(issues));

  fetch_issues();


}

function fetch_issues(){
  var issues = JSON.parse(localStorage.getItem('issues'));
  var issues_list = document.getElementById('issues_list');

  issues_list.innerHTML = '';

  for(var i = 0; i < issues.length; i++){
    var id = issues[i].id;
    var desc = issues[i].description;
    var severity = issues[i].severity;
    var assigned_to = issues[i].assigned_to;
    var status = issues[i].status;

    issues_list.innerHTML += '<div class="well">'+
                              '<h6>Issue ID: '+ id + '</h6>'+
                              '<p><span class="label label-info">' + status + '<span></p>'+
                              '<h3>' + desc + '</h3>'+
                              '<p><span class="glyphicon glyphicon-time"></span>' + severity + '</p>'+
                              '<p><span class="glyphicon glyphicon-user"></span>' + assigned_to + '</p>' +
                              '<a href="#" onclick="set_status_closed(\''+id+'\')" class="btn btn-warning">Close</a>' +
                              '<a href="#" onclick="delete_issue(\''+id+'\')" class="btn btn-danger">Delete</a>' +
                              '</div>';
  }
}
