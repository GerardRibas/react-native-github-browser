'use strict';

var React = require('react-native');
var moment = require('moment');
var {
  Text,
  View,
  Component,
  ListView,
  StyleSheet,
  Image,
} = React;

class PushPayload extends Component {

	constructor(props) {
		super(props);

		var ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 != r2
		});
		
		this.state = {
			dataSource : ds,
			pushEvent: props.pushEvent
    	}
	}
	
	render(){
		console.log(this.state.pushEvent.actor.login);
    	return (
    		<View style={styles.container}>
    			<Image 
    				source={{uri:this.state.pushEvent.actor.avatar_url}} 
    				style={styles.actorImage} />
    			<Text
    				style={styles.authorTitle}>
    					{this.state.pushEvent.actor.login}
    			</Text>
    			<Text
    				style={styles.createdAt}>
    					{moment(this.state.pushEvent.created_at).fromNow()}
    			</Text>
    			<Text
    				style={styles.repoName}>
    					{this.state.pushEvent.repo.name}
    			</Text>
    		</View>
    	);
  }

}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 80,
        justifyContent: 'flex-start',
        alignItems: 'center'
	},
	actorImage: {
		height: 120,
		width: 120,
		borderRadius: 60
	},
	authorTitle: {
		paddingTop: 40,
		paddingBottom: 20,
    	fontSize: 20
	},
	createdAt: {
		paddingTop: 20,
		paddingBottom: 20,
    	fontSize: 15
	}
});

module.exports= PushPayload; 