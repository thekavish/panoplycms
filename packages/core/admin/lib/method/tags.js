Meteor.methods({
	addTag: function(title,desc,metaKeyword,metaDesc){
		return Tags.insert({
			title:title,
			alias:title.toLowerCase().replace(/[^0-9a-zA-Z ]/g, "").replace(/\s+/g, '-'),
			desc:desc,
			metaKeyword:metaKeyword,
			metaDescription:metaDesc,
			createdAt: new Date(),
			updateAt: '',
            status:1,
            trash:false,
			owner: '',
	      	username: ''

		})
	},
	deleteTag:function(id){
		Tags.update({_id:id},{$set:{trash:true}});
	},
	editTag:function(id,title,desc,metaKeyword,metaDesc){
		return Tags.update({_id:id},{$set:{
			title:title,
			alias:title.toLowerCase().replace(/[^0-9a-zA-Z ]/g, "").replace(/\s+/g, '-'),
			desc:desc,
			metaKeyword:metaKeyword,
			metaDescription:metaDesc,
			updateAt:new Date(),
            status:1,
            trash:false,
			owner: '',
	      	username: ''

		}})
		
	},
	addTagExt:function(tag){
		Tags.insert({title:tag});
	}
})