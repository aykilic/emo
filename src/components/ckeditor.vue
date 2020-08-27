<template>
    <div>
        <ckeditor  :config="editorConfig" v-model="text"></ckeditor>
    </div>
</template>

<script>
import Vue from "vue";
// import CKEditor from 'ckeditor4-vue';
import  '../statics/ckeditor4-vue';
// import ClassicEditor from '../../node_modules/@ckeditor/ckeditor5-build-classic';
// import CKEditor from '../statics/ckeditor/build-config';
// Vue.use( CKEditor );
// CKEDITOR.editorConfig: {config}
    export default {
        name:'ck',
        props: ["model"],
        components: {
             'ckeditor':CKEditor.component
        },
        watch: {
            model(val) {
                this.text=val //hatalı
            }
        },
        beforeDestroy() {
           
        },
        data() {
            return {
                text:"",
                // editor: ClassicEditor,
                editorConfig: {
                    // allowedContent: true,
                    // uiColor: "#AADC6E",
                    // editorUrl:'sdsfsdf',
                    toolbar : 
                        [
                        { name: 'document', items : [ 'Source','-','Save','NewPage','DocProps','Preview','Print','-','Templates' ] },
                        // { name: 'clipboard', items : [ 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
                        { name: 'editing', items : [ 'Find','Replace','-','SelectAll','-','SpellChecker', 'Scayt' ] },
                        { name: 'forms', items : [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton',
                            'HiddenField' ] },
                        '/',
                        { name: 'basicstyles', items : [ 'Bold','Italic','Underline','Strike','-','RemoveFormat' ] },
                        { name: 'paragraph', items : [ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote','CreateDiv',
                            '-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-' ] },
                        { name: 'links', items : [ 'Link','Unlink','Anchor' ] },
                        // { name: 'insert', items : [ 'Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak','Iframe' ] },
                        { name: 'insert', items : [ 'Image','Table','HorizontalRule','Smiley','SpecialChar','PageBreak','Iframe' ] },
                        '/',
                        { name: 'styles', items : [ 'Styles','Format','Font','FontSize' ] },
                         { name: 'colors', items : [ 'TextColor','BGColor' ] },
                        { name: 'tools', items : [ 'Maximize', 'ShowBlocks','-' ] },
                        { name: 'about' }
                ]
                    // toolbarGroups : [
                        // { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
                        // { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
                        // { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
                        // { name: 'forms', groups: [ 'forms' ] },
                        // { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
                        // { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
                        // { name: 'links', groups: [ 'links' ] },
                        // { name: 'insert', groups: [ 'insert' ] },
                        // { name: 'styles', groups: [ 'styles' ] },
                        // { name: 'colors', groups: [ 'colors' ] },
                        // { name: 'tools', groups: [ 'tools' ] },
                        // { name: 'others', groups: [ 'others' ] },
                    // ]
                
                  },
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>