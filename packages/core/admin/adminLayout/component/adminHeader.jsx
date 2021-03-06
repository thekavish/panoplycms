AdminHeader = React.createClass({
	submitData(event){
		event.preventDefault();
		key=ReactDOM.findDOMNode(this.refs.key).value.trim();
		Meteor.call('saveSerachKey',key,function(err,data){
			if(err){
				console.log(err);
			}else{
			}
		})
		ReactDOM.findDOMNode(this.refs.key).value = '';
	},	
	render(){
		return(
			<nav className="navbar navbar-default navbar-static-top">
				<div className="container-fluid">
					<div className="navbar-header col-md-2">
						<Logo />
					</div>
					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">			
						<form className="navbar-form navbar-left" onSubmit={this.submitData} >
							<div className="form-group">
								<input type="text" ref="key" className="form-control" placeholder="Search" />
							</div>
							<button type="submit" className="btn btn-default"><i className="fa fa-search"></i></button>
						</form>
						<div className="btn-group pull-right">
							<Usersettings />
						</div>
					</div>
				</div>
			</nav>
		)
	}
});

Usersettings=React.createClass({
	mixins:[ReactMeteorData],
	getMeteorData(){ 
		var handle = Meteor.subscribe('usersProfile')
		return {
			pageLoading: ! handle.ready(), 
			user: Meteor.users.findOne(),
			results: Images.findOne()
		};
	},
	logout(event){
		event.preventDefault();
		Meteor.logout();
		FlowRouter.go('login');
	},
	render(){
		if (this.data.pageLoading) {
			return <LoadingSpinner />;
		}
		// console.log(this.data.results.url());
		return(
			<div>
				<button type="button" className="btn btn-logged" data-toggle="dropdown">
					<span className="custom-span">{/*Meteor.user().profile.username*/}{Meteor.user().username}</span>
					<img src={this.data.user?this.data.user.url: ''} alt="Cinque Terre" width="50" height="20" />
					<span className="caret"></span>
				</button>
				<ul className="dropdown-menu pull-right">
					<li><a href={FlowRouter.path( 'myProfile')}><i className="fa fa-user"></i> {i18n('ADMIN_HEADER_MY_PROFILE')}</a></li>
					<li><a href={FlowRouter.path( 'edit')}><i className="fa fa-cog"></i> {i18n('ADMIN_HEADER_ACCOUNT_SETTINGS')}</a></li>
					<li><a href="#"><i className="fa fa-question-circle"></i> {i18n('ADMIN_HEADER_HELP')}</a></li>
					<li onClick={this.logout}><a href={FlowRouter.path( 'login')}><i className="fa fa-sign-out"	></i>{i18n('ADMIN_HEADER_LOGOUT')}</a></li>
				</ul>
			</div>
		)
	}
});

Logo=React.createClass({
	mixins:[ReactMeteorData],

	getMeteorData(){ 
	var handle = Meteor.subscribe('siteName')
	return {
		pageLoading: ! handle.ready(), 
		results: Sites.findOne()
	};
	
	},
	render(){
		if (this.data.pageLoading) {
			return <LoadingSpinner />;
		}
		return( 
		<div>
			<a className="navbar-brand" href="#">
				{this.data.results.name.length>10?this.data.results.name.substring(0,9)+'...':this.data.results.name}
			</a>
		</div>
		)
	}
});

LoadingSpinner=React.createClass({
	render:function(){
	return <div>Loading....</div>
	}
});