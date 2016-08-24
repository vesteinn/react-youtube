import _ from 'lodash';
import React, { Component } from 'react';
import SearchBar from './search_bar';
import VideoList from './video_list';
import VideoDetail from './video_detail';
import YTSearch from 'youtube-api-search';
const API_KEY_YOUTUBE = 'AIzaSyA7KWus7_nx4wTXy7lugywYaWxR_WBBoos';

export default class App extends Component {

  constructor(props){

    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('pet shop boys');
  }

  videoSearch(term) {
    YTSearch({key: API_KEY_YOUTUBE, term: term}, (videos) => {
      this.setState({
          videos: videos,
          selectedVideo: videos[0]
      });
    });
  }

  render() {
    const videoSearch = _.debounce( (term) => { this.videoSearch(term) }, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={ (term) => videoSearch(term) }/>
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
          videos={this.state.videos} />
      </div>
    );
  }
}
