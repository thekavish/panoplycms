MenuModule = React.createClass({
	componentWillUnmount(){
	},
	mixins: [ReactMeteorData],
	getMeteorData() {
		var handle = Meteor.subscribe('menus');
		return {
			ready : handle.ready(),
			menus: Menus.find({"trash" : false}).fetch()
		};
	},
	renderMenuList(){
		// console.log(this.data.menus,'Voila!')
		return this.data.menus.map((menu) => {
			return <MenuList key={menu._id} menu={menu} />;
		});
	},
	getMenu() {
		// console.log($(ReactDOM.findDOMNode(this.refs.menu)).val(),"прочность!!")
		var value = {
			"menuId"	:	$(ReactDOM.findDOMNode(this.refs.menu)).val(),
			"level"		:	$(ReactDOM.findDOMNode(this.refs.menulevel)).val()
		};
		// console.log(value);
		return value;
	},
	render(){
		return(
			<div className="form-group">
				<label htmlFor="menu" className="col-sm-1 control-label">{i18n('ADMIN_EXTENSION_MODULES_ADDMODULE_FORM_SELECT_MENU')}</label>
				<div className="col-sm-5">
					<select id="select_menu" name="select-menu" ref="menu" className="form-control" >
						<option value="">-- None --</option>
						{this.renderMenuList()}
					</select>
				</div>
				<label htmlFor="menulevels" className="col-sm-1 control-label">{i18n('ADMIN_EXTENSION_MODULES_ADDMODULE_FORM_SHOW_LEVELS')}</label>
				<div className="col-sm-5">
					<input type="text" name="menulevel" ref="menulevel" id="menulevel" className="form-control" defaultValue="1"/>
				</div>
			</div>
		);
	}
});

MenuList = React.createClass({
	propTypes:{
		menu: React.PropTypes.object.isRequired,
	},
	render(){
		// console.log(this.props.menu._id,'Skadoooosh!!')
		return (
			<option value={this.props.menu._id}>{this.props.menu.title}</option>
		);
	}
});
