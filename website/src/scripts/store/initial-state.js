/**
 * App-store structure
 */
const store = {
  appEnv: {},

  user: {},

  data: {
    blogs: {},
    locations: {}
  },

  pages: {
    map: {
      filters: [],
      sidebarIsOpen: false,
      displayedBlogs: [],
    },

    blog: {
      isFetching: false,
      blog: {}
    },

    images: {},

    cms: {
      payloadSending: false,
      blogSaved: false,

      showModal: false,

      selected: {}, // finale blog object that is save in database
      images: [], // state of images being uploaded to firebase

      imageSelectionEnabled: true,
      imageFiles: [
        {
          isUploading: false,
          originalName: '',
          storageName: '',
          file: [] // probalby is going to be a js File
        }
      ],
      imageFilesToDelete: []
    },

    login: {
      loginAttempt: 1,
      password: '',
      email: ''
    }
  }
};
