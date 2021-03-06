/*---------------- MODULES LAYOUT ---------------*/

ModulesLayout = React.createClass({

	// This mixin makes the getMeteorData method work
	mixins: [ReactMeteorData],

	getMeteorData() {
		return {
			mod: Modules.find({trash:false},{sort:{createdAt:-1}}).fetch(),
		};
	},
	componentDidMount: function() {
		document.title = "Module Manager";
	},
	/*submitModForm() {
		FlowRouter.go("AddModules",{'type':'htmlBlock'});
	},*/
	insertSidebar() {
	},
	renderModules() {
		return this.data.mod.map((module) => {
			return <ModuleListing key={module._id} module={module} />;
		});
	},
	render() {
		return (
			<div className="col-md-12" id="container">
		    <div className="dropdown">
	        <button className="btn btn-success  dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">Add Module&nbsp;
            <span className="caret"></span>
	        </button>
	        <ul className="dropdown-menu" role="menu" aria-labelledby="menu1">
            <li><a role="menuitem" tabIndex="-1" href={FlowRouter.path( "AddModules",{ 'type': 'HtmlBlock'})}>HTML Block</a></li>
            <li><a role="menuitem" tabIndex="-1" href={FlowRouter.path( "AddModules",{ 'type': 'MenuModule'})}>Menu Module</a></li>
            <li><a role="menuitem" tabIndex="-1" href={FlowRouter.path( "AddModules",{ 'type': 'Banners'})}>Banner</a></li>
	        </ul>
		    </div>
		    <table className="table table-striped">
	        <thead>
            <tr>
              <th className="">{i18n('ADMIN_EXTENSION_MODULES_ADDMODULE_FORM_TITLE')}</th>
              <th className="">{i18n('ADMIN_EXTENSION_MODULES_ADDMODULE_FORM_HTML')}</th>
              <th className="">{i18n('ADMIN_EXTENSION_MODULES_ADDMODULE_FORM_TYPE')}</th>
              <th className="">{i18n('ADMIN_EXTENSION_MODULES_ADDMODULE_FORM_ID')}</th>
              <th className="">{i18n('ADMIN_EXTENSION_MODULES_ADDMODULE_FORM_UPDATE')}</th>
              <th className="">{i18n('ADMIN_EXTENSION_MODULES_ADDMODULE_FORM_REMOVE')}</th>
            </tr>
	        </thead>
	        <tbody>{this.renderModules()}</tbody>
		    </table>
			</div>
		);
	}
});

/*---------------- MODULE LISTING ---------------*/

ModuleListing = React.createClass({
	propTypes: {
		module: React.PropTypes.object.isRequired,
	},
	trashThisModule(){
		Meteor.call("removeModule", this.props.module._id)
	},
	renderAModule(){
		FlowRouter.go('EditModule',{_id:this.props.module._id});
	},
	render(){
		return(
			<tr className="">
				<td className="hidden-phone">
					<a href={FlowRouter.path( 'EditModule',{_id:this.props.module._id})}>
						<large>{this.props.module.title}&nbsp;</large>
						<small><em>({this.props.module.alias})</em></small>
					</a>
				</td>
				<td className="hidden-phone">
					<span className="label label-info">{this.props.module.position}</span>
				</td>
				<td className="small hidden-phone">{this.props.module.modDesc.type}</td>
				<td className="small hidden-phone">{this.props.module._id}</td>
				<td className="small hidden-phone">
					<button type="button" onClick={this.renderAModule} className="btn-edit-module btn btn-primary btn-xs">
						<span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
					</button>
				</td>
				<td className="small hidden-phone">
					<button type="button" onClick={this.trashThisModule} className="btn-remove-module btn-danger btn btn-xs">
						<span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
					</button>
				</td>
			</tr>
		);
	}
});
