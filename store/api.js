var url;

if (process.env.NODE_ENV == "development") {
    var url = "http://127.0.0.1:8000";
} else {
    var url = "http://api.ft500.in";
}

console.log(url);

export const state = () => ({
    login: url + "/login_admin",

    getHomeCMS: url + "/home_cms",

    getHomeCMSById: url + "/edit_home_cms/",

    deleteHomeCMS: url + "/delete_home_cms/",

    activateHomeCmsById: url + "/active_home_cms/",

    activatedHomeCMS: url + "/activated_home_cms",

    getCategoryCMS: url + "/category_cms",

    getCategoryCMSById: url + "/edit_category_cms/",

    activatedCategoryCMS: url + "/activated_category_cms",

    activateCategoryCmsById: url + "/active_category_cms/",

    makefeaturedById: url + "/make_featured/",

    getContactCMS: url + "/contact_cms",

    deleteContact: url + "/deleteContact/",

    getContactCMSById: url + "/edit_contact_cms/",

    activateContactCmsById: url + "/active_contact_cms/",

    activatedContactCMS: url + "/activated_contact_cms",

    getAboutCMS: url + "/about_cms",

    all_startups: url + "/all_startups",

    getAboutCMSById: url + "/edit_about_cms/",

    activatedAboutCMS: url + "/activated_about_cms",

    activateAboutCmsById: url + "/active_about_cms/",

    CMSgetCategory: url + "/cms_category",

    getCategoryById: url + "/edit_category/",

    categoryStatus: url + "/category_status/",

    categoryHomeStatus: url + "/category_home_status/",

    getFooterCMS: url + "/footer_cms",

    activatedFooterCMS: url + "/activated_footer_cms",

    activateFooterCmsById: url + "/active_footer_cms/",

    getFooterCMSById: url + "/edit_footer_cms/",

    updateContactForm: url + "/edit_contact_form/",

    getInactiveComponents: url + "/get_inactive_home_components/",

    getActiveComponents: url + "/get_active_home_components/",

    getActiveStaticComponents: url + "/get_static_components",

    editStaticComponents: url + "/edit_static_components/", //pk

    createStaticComponents: url + "/create_static_components", //pk

    delete_footer: url + "/delete_footer/", //pk

    getcontact: url + "/getcontact", //pk

    all_users: url + "/all_users"
});

export const getters = {
    // getLoginAPI(state) {
    //     return state.login
    // }
};