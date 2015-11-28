'use strict';

var React = require('react-native');
var moment = require('moment');
var {
  Text,
  View,
  Component,
  ListView,
  ActivityIndicatorIOS,
  StyleSheet,
  Image
} = React;

class Feed extends Component {

	constructor(props) {
		super(props);

		var ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 != r2
		});
		
		this.state = {
			dataSource : ds,
			showProgress : true
    	}
	}

	componentDidMount() {
		this.fetchFeed();
	}

	fetchFeed(){
		require('./AuthService').getAuthInfo((err, authInfo) => {
			var url = 'https:api.github.com/users/' 
				+ authInfo.user.login 
				+ '/received_events';
			fetch(url, {
				headers: authInfo.header
			})
			.then((response) => response.json())
			.then((responseData) => {
				var feedItems = 
					responseData.filter((ev)  => ev.type =='WatchEvent');

				this.setState({
					dataSource : this.state.dataSource.cloneWithRows(feedItems),
					showProgress: false
				})
			})

		});
	}

	renderRow(rowData) {
		return (
			<View style={styles.viewRowData}>
				<Image
					source={{uri: rowData.actor.avatar_url}}
					style={styles.imageRowData} />
			
				<View style={styles.viewRowDataDetail}>
					
					<Text style={styles.rowDataDetailText}>
						{moment(rowData.created_at).fromNow()}
					</Text>
					<Text style={styles.rowDataDetailText}>
						{rowData.actor.login}
					</Text>
					<Text style={styles.rowDataDetailText}>
						at <Text style={styles.rowDataDetailTextBold}>{rowData.repo.name}</Text>
					</Text>
				</View>
			</View>
		);
	}
	
	render(){
    	if(this.state.showProgress) {
    		return (
    			<View style={styles.showProgress}>
    				<ActivityIndicatorIOS 
    					size="large"
    					animating={true} />
    			</View>
    		)
    	}
    	return (
    		<View style={styles.container}>
    			<ListView
    				dataSource={this.state.dataSource}
    				renderRow={this.renderRow.bind(this)} />
    		</View>
    	);
  }

}

var styles = StyleSheet.create({
	container:{
		flex: 1,
    	justifyContent: 'flex-start'
	},
	viewRowData: {
		flex: 1,
		flexDirection: 'row',
		padding: 20,
		alignItems: 'center',
		borderColor: '#D7D7D7',
		borderBottomWidth: 1,
	},
	imageRowData: {
		height: 36,
		width: 36,
		borderRadius: 18
	},
	viewRowDataDetail:{ paddingLeft: 20 },
	rowDataDetailText: {backgroundColor: '#FFF'},
	rowDataDetailTextBold: {fontWeight: '600'},
	showProgress: {
		flex: 1,
    	justifyContent: 'center'
	}
});

module.exports= Feed; 