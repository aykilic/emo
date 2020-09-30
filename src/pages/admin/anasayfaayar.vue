<template>
    <div class="q-pt-md q-pb-md  q-gutter-md col-12">
      <q-tabs
          v-model="tab"
          dense
          class="text-grey "
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab  name="one" label="Slider 1"></q-tab>
          <q-tab  name="two" label="Slider 2"></q-tab>
          <q-tab  name="three" label="Reklam 1"></q-tab>
          <q-tab  name="four" label="Etiket 1"></q-tab>
          <q-tab  name="five" label="Reklam 2"></q-tab>
          <q-tab  name="six" label="Reklam 3"></q-tab>
          <q-tab  name="seven" label="Reklam 4"></q-tab>
          <q-tab  name="eight" label="stamp"></q-tab>
        </q-tabs>
        <q-separator class="q-ml-none  "/>
        <!-- // TODO: Slider1 -->
        <q-tab-panels class="row " v-model="tab" animated>
          <q-tab-panel class="col-12 q-pa-none" name="one">
            <q-card class="q-pa-none row  col-md-12 col-xs-12 " >
            <q-card-section class=" bg-primary text-white col-12 ">
                <div class="text-h6">Slider1 Resim Yükleme </div>
            </q-card-section>
            <div class="row col-12 justify-center">
                <q-select
                  fill-input
                  input-debounce="0"
                  hide-selected
                  use-input
                  @filter="filterFn"
                  class="q-pa-md  col-6 col-md-6 col-xs-12"
                  label="Stok yada Kategori Adı"
                  outlined
                  v-model="edittreemselect"
                  :options="select_options"
                  option-value="_id"
                  option-label="stokturad"
                  
                  auto-select
                ></q-select>
            </div>
            <q-separator/>
            <anaslidercloud
                v-if="edittreemselect !=''"
                v-on:refreshlist="slider1listrefresh"
                label="Ana Sayfa Slider1"
                class="row q-pa-md col-12"
                :uploadname="'slider1'"
                :stokid="edittreemselect._id"
                :stokturad="edittreemselect.stokturad"
                color="white"
                text-color="black"
              >
                <template v-slot:list="scope">
                    
                  <q-list separator>
                    <q-item v-for="file in scope.files" :key="file.name" class="">
                      <q-item-section class="col-4">
                        <q-item-label class="full-width ellipsis">{{ file.name }}</q-item-label>

                        <q-item-label caption>
                           Durum: {{ file.__status }} 
                        </q-item-label>

                        <q-item-label caption>
                          {{ file.__sizeLabel }} / {{ file.__progressLabel }} 
                        </q-item-label>
                      </q-item-section>
                      <q-item-section class="col-4">
                          
                      </q-item-section>  
                      
                      <q-item-section v-if="file.__img  " thumbnail class="gt-xs col">
                        <img style="object-fit: contain;" :src="file.__img.src" />
                      </q-item-section>
                      
                      <q-item-section   side>
                        <q-btn
                          class="gt-xs"
                          size="14px"
                          flat
                          dense
                          round
                          icon="delete"
                          @click="scope.removeFile(file)"
                        />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </template>
                
            </anaslidercloud>
            <q-separator v-if="val.kategori_link !=''"></q-separator>
            <q-card-section class="bg-primary text-white col-12 ">
                <div class="text-h6">Slider1 Resim Listesi </div>
            </q-card-section>
            <div class="col-12">
              <q-table
              class="q-pa-md"
                :data="slider1imgdata"
                :columns="slider1columns"
                row-key="_id"
                selection="single"
                no-data-label="Veri Bulunamadı...!"
                grid
                hide-header
                :pagination.sync="sliderpagination"
              >
                <template v-slot:item="props">
                  <!-- <div
                class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                :style="props.selected ? 'transform: scale(0.95);' : ''"
                  >-->
                  <div class="q-pa-xs row col-xs-12 col-md-4 ">
                    <!-- <q-card :class="props.selected ? 'bg-grey-2' : ''"> -->
                    <q-card class="col">
                      <q-card-section class="row">
                        <!-- <q-checkbox dense v-model="props.selected" label="Ürün Resmi" ></q-checkbox> -->

                        <q-item-label class="q-pt-md">{{props.row.filename}}</q-item-label>
                        <q-space/>
                        <q-btn
                          @click="imagedelete(props.row)"
                          icon="delete"
                          color="grey-7"
                          flat
                          round
                        ></q-btn>
                      </q-card-section>
                      <q-separator></q-separator>
                      <q-card-section @click="slider1sira=true,val=props.row" style="cursor:pointer;position: relative;text-align: center;">
                          <!-- :label="`${props.row.sira}`" -->
                          
                        <q-img
                          :src="props.row.path + props.row.publicid"
                          spinner-color="primary"
                          spinner-size="82px"
                          style="display: inline-block;text-align:center;"
                          
                          
                        ></q-img><div class="text-h2 text-black  text-weight-medium"  style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%)"> {{ props.row.sira }} </div>
                      </q-card-section>
                    </q-card>
                  </div>
                </template>
              </q-table>
            </div>
            </q-card>

          </q-tab-panel>
          <!-- TODO: Slider2 -->
          <q-tab-panel class="col-12 q-pa-none" name="two">

            <q-card class="row  col-md-12 col-xs-12 " >
            <q-card-section class="bg-primary text-white col-12 ">
                <div class="text-h6">Slider2 Resim Yükleme </div>
            </q-card-section>
            <div class="row col-12 justify-center">
                <q-select
                  fill-input
                  input-debounce="0"
                  hide-selected
                  use-input
                  @filter="filterFn"
                  class="q-pa-md col-xs-12 col-6"
                  label="Stok yada Kategori Adı"
                  outlined
                  v-model="edittreemselect"
                  :options="select_options"
                  option-value="_id"
                  option-label="stokturad"
                  auto-select
                ></q-select>
            </div>
            <q-separator></q-separator>
            <anaslidercloud
                v-if="edittreemselect !=''"
                v-on:refreshlist="slider1listrefresh"
                label="Ana Sayfa Slider2"
                class="row q-pa-md col-12"
                :uploadname="'slider2'"
                :stokid="edittreemselect._id"
                :stokturad="edittreemselect.stokturad"
                color="white"
                text-color="black"
              >
                <template v-slot:list="scope">
                    
                  <q-list separator>
                    <q-item v-for="file in scope.files" :key="file.name" class="row">
                      <q-item-section class="col-4">
                        <q-item-label class="full-width ellipsis">{{ file.name }}</q-item-label>

                        <q-item-label caption>
                           Durum: {{ file.__status }} 
                        </q-item-label>

                        <q-item-label caption>
                          {{ file.__sizeLabel }} / {{ file.__progressLabel }} 
                        </q-item-label>
                      </q-item-section>
                      <q-item-section class="col-4">
                          
                      </q-item-section>  
                      
                      <q-item-section v-if="file.__img  " thumbnail class="gt-xs col">
                        <img style="object-fit: contain;" :src="file.__img.src" />
                      </q-item-section>
                      
                      <q-item-section   side>
                        <q-btn
                          class="gt-xs"
                          size="14px"
                          flat
                          dense
                          round
                          icon="delete"
                          @click="scope.removeFile(file)"
                        />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </template>
                
            </anaslidercloud>
            <q-separator v-if="val.kategori_link !=''"></q-separator>
            <q-card-section class="bg-primary text-white col-12 ">
                <div class="text-h6">Slider2 Resim Listesi </div>
            </q-card-section>
            <div class="col-12">
              <q-table
              class="q-pa-md"
                :data="slider2imgdata"
                :columns="slider1columns"
                row-key="_id"
                selection="single"
                no-data-label="Veri Bulunamadı...!"
                grid
                hide-header
                :pagination.sync="sliderpagination"
              >
                <template v-slot:item="props">
                  <!-- <div
                class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                :style="props.selected ? 'transform: scale(0.95);' : ''"
                  >-->
                  <div class="q-pa-xs row col-xs-12 col-md-4">
                    <!-- <q-card :class="props.selected ? 'bg-grey-2' : ''"> -->
                    <q-card class="col">
                      <q-card-section class="row">
                        <!-- <q-checkbox dense v-model="props.selected" label="Ürün Resmi" ></q-checkbox> -->

                        <q-item-label class="q-pt-md">{{props.row.filename}}</q-item-label>
                        <q-space/>
                        <q-btn
                          @click="image2delete(props.row)"
                          icon="delete"
                          color="grey-7"
                          flat
                          round
                        ></q-btn>
                      </q-card-section>
                      <q-separator></q-separator>
                      <q-card-section @click="slider2sira=true,val=props.row" style="cursor:pointer;position: relative;text-align: center;">
                          <!-- :label="`${props.row.sira}`" -->
                          
                        <q-img
                          :src="props.row.path + props.row.publicid"
                          spinner-color="primary"
                          spinner-size="82px"
                          style="display: inline-block;text-align:center;"
                          
                          
                        ></q-img><div class="text-h2 text-black  text-weight-medium"  style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%)"> {{ props.row.sira }} </div>
                      </q-card-section>
                    </q-card>
                  </div>
                </template>
              </q-table>
            </div>
            </q-card>





          </q-tab-panel>
          <!-- TODO: Reklam1 -->
          <q-tab-panel name="three">
            <q-card class="row  col-md-12 col-xs-12 " >
            <q-card-section class="bg-primary text-white col-12 ">
                <div class="text-h6">Slider2 Resim Yükleme </div>
            </q-card-section>
            <div class="row col-12 justify-center">
                <q-select
                  fill-input
                  input-debounce="0"
                  hide-selected
                  use-input
                  @filter="filterFn"
                  class="q-pa-md col-xs-12 col-6"
                  label="Stok yada Kategori Adı"
                  outlined
                  v-model="edittreemselect"
                  :options="select_options"
                  option-value="_id"
                  option-label="stokturad"
                  auto-select
                ></q-select>
            </div>
            <q-separator></q-separator>
            <anaslidercloud
                v-if="edittreemselect !=''"
                v-on:refreshlist="slider1listrefresh"
                label="Ana Sayfa Reklam1"
                class="row q-pa-md col-12"
                :uploadname="'reklam1'"
                :stokid="edittreemselect._id"
                :stokturad="edittreemselect.stokturad"
                color="white"
                text-color="black"
              >
                <template v-slot:list="scope">
                    
                  <q-list separator>
                    <q-item v-for="file in scope.files" :key="file.name" class="row">
                      <q-item-section class="col-4">
                        <q-item-label class="full-width ellipsis">{{ file.name }}</q-item-label>

                        <q-item-label caption>
                           Durum: {{ file.__status }} 
                        </q-item-label>

                        <q-item-label caption>
                          {{ file.__sizeLabel }} / {{ file.__progressLabel }} 
                        </q-item-label>
                      </q-item-section>
                      <q-item-section class="col-4">
                          
                      </q-item-section>  
                      
                      <q-item-section v-if="file.__img  " thumbnail class="gt-xs col">
                        <img style="object-fit: contain;" :src="file.__img.src" />
                      </q-item-section>
                      
                      <q-item-section   side>
                        <q-btn
                          class="gt-xs"
                          size="14px"
                          flat
                          dense
                          round
                          icon="delete"
                          @click="scope.removeFile(file)"
                        />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </template>
                
            </anaslidercloud>
            <q-separator v-if="val.kategori_link !=''"></q-separator>
            <q-card-section class="bg-primary text-white col-12 ">
                <div class="text-h6">Reklam1 Resim Listesi </div>
            </q-card-section>
            <div class="col-12">
              <q-table
              class="q-pa-md"
                :data="reklam1imgdata"
                :columns="slider1columns"
                row-key="_id"
                selection="single"
                no-data-label="Veri Bulunamadı...!"
                grid
                hide-header
                :pagination.sync="sliderpagination"
              >
                <template v-slot:item="props">
                  <!-- <div
                class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                :style="props.selected ? 'transform: scale(0.95);' : ''"
                  >-->
                  <div class="q-pa-xs row col-xs-12 col-md-4">
                    <!-- <q-card :class="props.selected ? 'bg-grey-2' : ''"> -->
                    <q-card class="col">
                      <q-card-section class="row">
                        <!-- <q-checkbox dense v-model="props.selected" label="Ürün Resmi" ></q-checkbox> -->

                        <q-item-label class="q-pt-md">{{props.row.filename}}</q-item-label>
                        <q-space/>
                        <q-btn
                          @click="reklam1delete(props.row)"
                          icon="delete"
                          color="grey-7"
                          flat
                          round
                        ></q-btn>
                      </q-card-section>
                      <q-separator></q-separator>
                      <q-card-section @click="reklam1sira=true,val=props.row" style="cursor:pointer;position: relative;text-align: center;">
                          <!-- :label="`${props.row.sira}`" -->
                          
                        <q-img
                          :src="props.row.path + props.row.publicid"
                          spinner-color="primary"
                          spinner-size="82px"
                          style="display: inline-block;text-align:center;"
                          
                          
                        ></q-img><div class="text-h2 text-black  text-weight-medium"  style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%)"> {{ props.row.sira }} </div>
                      </q-card-section>
                    </q-card>
                  </div>
                </template>
              </q-table>
            </div>
            </q-card>
          </q-tab-panel>
          <!-- TODO: Etiket1 -->
          <q-tab-panel name="four">
            <q-card class="row  col-md-12 col-xs-12 " >
            <q-card-section class="bg-primary text-white col-12 ">
                <div class="text-h6">Etiket1 Resim Yükleme </div>
            </q-card-section>
            <div class="row col-12 justify-center">
                <q-select
                  fill-input
                  input-debounce="0"
                  hide-selected
                  use-input
                  @filter="filterFn"
                  class="q-pa-md col-xs-12 col-6"
                  label="Stok yada Kategori Adı"
                  outlined
                  v-model="edittreemselect"
                  :options="select_options"
                  option-value="_id"
                  option-label="stokturad"
                  auto-select
                ></q-select>
            </div>
            <q-separator></q-separator>
            <anaslidercloud
                v-if="edittreemselect !=''"
                v-on:refreshlist="slider1listrefresh"
                label="Ana Sayfa Etiket1"
                class="row q-pa-md col-12"
                :uploadname="'etiket1'"
                :stokid="edittreemselect._id"
                :stokturad="edittreemselect.stokturad"
                color="white"
                text-color="black"
              >
                <template v-slot:list="scope">
                    
                  <q-list separator>
                    <q-item v-for="file in scope.files" :key="file.name" class="row">
                      <q-item-section class="col-4">
                        <q-item-label class="full-width ellipsis">{{ file.name }}</q-item-label>

                        <q-item-label caption>
                           Durum: {{ file.__status }} 
                        </q-item-label>

                        <q-item-label caption>
                          {{ file.__sizeLabel }} / {{ file.__progressLabel }} 
                        </q-item-label>
                      </q-item-section>
                      <q-item-section class="col-4">
                          
                      </q-item-section>  
                      
                      <q-item-section v-if="file.__img  " thumbnail class="gt-xs col">
                        <img style="object-fit: contain;" :src="file.__img.src" />
                      </q-item-section>
                      
                      <q-item-section   side>
                        <q-btn
                          class="gt-xs"
                          size="14px"
                          flat
                          dense
                          round
                          icon="delete"
                          @click="scope.removeFile(file)"
                        />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </template>
                
            </anaslidercloud>
            <q-separator v-if="val.kategori_link !=''"></q-separator>
            <q-card-section class="bg-primary text-white col-12 ">
                <div class="text-h6">Etiket1 Resim Listesi </div>
            </q-card-section>
            <div class="col-12">
              <q-table
              class="q-pa-md"
                :data="etiket1imgdata"
                :columns="slider1columns"
                row-key="_id"
                selection="single"
                no-data-label="Veri Bulunamadı...!"
                grid
                hide-header
                :pagination.sync="sliderpagination"
              >
                <template v-slot:item="props">
                  <!-- <div
                class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                :style="props.selected ? 'transform: scale(0.95);' : ''"
                  >-->
                  <div class="q-pa-xs row col-xs-12 col-md-4">
                    <!-- <q-card :class="props.selected ? 'bg-grey-2' : ''"> -->
                    <q-card class="col">
                      <q-card-section class="row">
                        <!-- <q-checkbox dense v-model="props.selected" label="Ürün Resmi" ></q-checkbox> -->

                        <q-item-label class="q-pt-md">{{props.row.filename}}</q-item-label>
                        <q-space/>
                        <q-btn
                          @click="etiket1delete(props.row)"
                          icon="delete"
                          color="grey-7"
                          flat
                          round
                        ></q-btn>
                      </q-card-section>
                      <q-separator></q-separator>
                      <q-card-section @click="etiket1sira=true,val=props.row" style="cursor:pointer;position: relative;text-align: center;">
                          <!-- :label="`${props.row.sira}`" -->
                          
                        <q-img
                          :src="props.row.path + props.row.publicid"
                          spinner-color="primary"
                          spinner-size="82px"
                          style="display: inline-block;text-align:center;"
                          
                          
                        ></q-img><div class="text-h2 text-black  text-weight-medium"  style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%)"> {{ props.row.sira }} </div>
                      </q-card-section>
                    </q-card>
                  </div>
                </template>
              </q-table>
            </div>
            </q-card>
          </q-tab-panel>
          <!-- // TODO: Reklam2 -->
          <q-tab-panel name="five">
            <q-card class="row  col-md-12 col-xs-12 " >
            <q-card-section class="bg-primary text-white col-12 ">
                <div class="text-h6">Reklam2 Resim Yükleme </div>
            </q-card-section>
            <div class="row col-12 justify-center">
                <q-select
                  fill-input
                  input-debounce="0"
                  hide-selected
                  use-input
                  @filter="filterFn"
                  class="q-pa-md col-xs-12 col-6"
                  label="Stok yada Kategori Adı"
                  outlined
                  v-model="edittreemselect"
                  :options="select_options"
                  option-value="_id"
                  option-label="stokturad"
                  auto-select
                ></q-select>
            </div>
            <q-separator></q-separator>
            <anaslidercloud
                v-if="edittreemselect !=''"
                v-on:refreshlist="slider1listrefresh"
                label="Ana Sayfa Reklam2"
                class="row q-pa-md col-12"
                :uploadname="'reklam2'"
                :stokid="edittreemselect._id"
                :stokturad="edittreemselect.stokturad"
                color="white"
                text-color="black"
              >
                <template v-slot:list="scope">
                    
                  <q-list separator>
                    <q-item v-for="file in scope.files" :key="file.name" class="row">
                      <q-item-section class="col-4">
                        <q-item-label class="full-width ellipsis">{{ file.name }}</q-item-label>

                        <q-item-label caption>
                           Durum: {{ file.__status }} 
                        </q-item-label>

                        <q-item-label caption>
                          {{ file.__sizeLabel }} / {{ file.__progressLabel }} 
                        </q-item-label>
                      </q-item-section>
                      <q-item-section class="col-4">
                          
                      </q-item-section>  
                      
                      <q-item-section v-if="file.__img  " thumbnail class="gt-xs col">
                        <img style="object-fit: contain;" :src="file.__img.src" />
                      </q-item-section>
                      
                      <q-item-section   side>
                        <q-btn
                          class="gt-xs"
                          size="14px"
                          flat
                          dense
                          round
                          icon="delete"
                          @click="scope.removeFile(file)"
                        />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </template>
                
            </anaslidercloud>
            <q-separator v-if="val.kategori_link !=''"></q-separator>
            <q-card-section class="bg-primary text-white col-12 ">
                <div class="text-h6">Reklam2 Resim Listesi </div>
            </q-card-section>
            <div class="col-12">
              <q-table
              class="q-pa-md"
                :data="reklam2imgdata"
                :columns="slider1columns"
                row-key="_id"
                selection="single"
                no-data-label="Veri Bulunamadı...!"
                grid
                hide-header
                :pagination.sync="sliderpagination"
              >
                <template v-slot:item="props">
                  <!-- <div
                class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                :style="props.selected ? 'transform: scale(0.95);' : ''"
                  >-->
                  <div class="q-pa-xs row col-xs-12 col-md-4">
                    <!-- <q-card :class="props.selected ? 'bg-grey-2' : ''"> -->
                    <q-card class="col">
                      <q-card-section class="row">
                        <!-- <q-checkbox dense v-model="props.selected" label="Ürün Resmi" ></q-checkbox> -->

                        <q-item-label class="q-pt-md">{{props.row.filename}}</q-item-label>
                        <q-space/>
                        <q-btn
                          @click="reklam2delete(props.row)"
                          icon="delete"
                          color="grey-7"
                          flat
                          round
                        ></q-btn>
                      </q-card-section>
                      <q-separator></q-separator>
                      <q-card-section @click="reklam2sira=true,val=props.row" style="cursor:pointer;position: relative;text-align: center;">
                          <!-- :label="`${props.row.sira}`" -->
                          
                        <q-img
                          :src="props.row.path + props.row.publicid"
                          spinner-color="primary"
                          spinner-size="82px"
                          style="display: inline-block;text-align:center;"
                          
                          
                        ></q-img><div class="text-h2 text-black  text-weight-medium"  style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%)"> {{ props.row.sira }} </div>
                      </q-card-section>
                    </q-card>
                  </div>
                </template>
              </q-table>
            </div>
            </q-card>
          </q-tab-panel>
          <!-- // TODO: reklam3 -->
          <q-tab-panel name="six">
            <q-card class="row  col-md-12 col-xs-12 " >
            <q-card-section class="bg-primary text-white col-12 ">
                <div class="text-h6">Reklam3 Resim Yükleme </div>
            </q-card-section>
            <div class="row col-12 justify-center">
                <q-select
                  fill-input
                  input-debounce="0"
                  hide-selected
                  use-input
                  @filter="filterFn"
                  class="q-pa-md col-xs-12 col-6"
                  label="Stok yada Kategori Adı"
                  outlined
                  v-model="edittreemselect"
                  :options="select_options"
                  option-value="_id"
                  option-label="stokturad"
                  auto-select
                ></q-select>
            </div>
            <q-separator></q-separator>
            <anaslidercloud
                v-if="edittreemselect !=''"
                v-on:refreshlist="slider1listrefresh"
                label="Ana Sayfa Reklam3"
                class="row q-pa-md col-12"
                :uploadname="'reklam3'"
                :stokid="edittreemselect._id"
                :stokturad="edittreemselect.stokturad"
                color="white"
                text-color="black"
              >
                <template v-slot:list="scope">
                    
                  <q-list separator>
                    <q-item v-for="file in scope.files" :key="file.name" class="row">
                      <q-item-section class="col-4">
                        <q-item-label class="full-width ellipsis">{{ file.name }}</q-item-label>

                        <q-item-label caption>
                           Durum: {{ file.__status }} 
                        </q-item-label>

                        <q-item-label caption>
                          {{ file.__sizeLabel }} / {{ file.__progressLabel }} 
                        </q-item-label>
                      </q-item-section>
                      <q-item-section class="col-4">
                          
                      </q-item-section>  
                      
                      <q-item-section v-if="file.__img  " thumbnail class="gt-xs col">
                        <img style="object-fit: contain;" :src="file.__img.src" />
                      </q-item-section>
                      
                      <q-item-section   side>
                        <q-btn
                          class="gt-xs"
                          size="14px"
                          flat
                          dense
                          round
                          icon="delete"
                          @click="scope.removeFile(file)"
                        />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </template>
                
            </anaslidercloud>
            <q-separator v-if="val.kategori_link !=''"></q-separator>
            <q-card-section class="bg-primary text-white col-12 ">
                <div class="text-h6">Reklam3 Resim Listesi </div>
            </q-card-section>
            <div class="col-12">
              <q-table
              class="q-pa-md"
                :data="reklam3imgdata"
                :columns="slider1columns"
                row-key="_id"
                selection="single"
                no-data-label="Veri Bulunamadı...!"
                grid
                hide-header
                :pagination.sync="sliderpagination"
              >
                <template v-slot:item="props">
                  <!-- <div
                class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                :style="props.selected ? 'transform: scale(0.95);' : ''"
                  >-->
                  <div class="q-pa-xs row col-xs-12 col-md-4">
                    <!-- <q-card :class="props.selected ? 'bg-grey-2' : ''"> -->
                    <q-card class="col">
                      <q-card-section class="row">
                        <!-- <q-checkbox dense v-model="props.selected" label="Ürün Resmi" ></q-checkbox> -->

                        <q-item-label class="q-pt-md">{{props.row.filename}}</q-item-label>
                        <q-space/>
                        <q-btn
                          @click="reklam3delete(props.row)"
                          icon="delete"
                          color="grey-7"
                          flat
                          round
                        ></q-btn>
                      </q-card-section>
                      <q-separator></q-separator>
                      <q-card-section @click="reklam3sira=true,val=props.row" style="cursor:pointer;position: relative;text-align: center;">
                          <!-- :label="`${props.row.sira}`" -->
                          
                        <q-img
                          :src="props.row.path + props.row.publicid"
                          spinner-color="primary"
                          spinner-size="82px"
                          style="display: inline-block;text-align:center;"
                          
                          
                        ></q-img><div class="text-h2 text-black  text-weight-medium"  style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%)"> {{ props.row.sira }} </div>
                      </q-card-section>
                    </q-card>
                  </div>
                </template>
              </q-table>
            </div>
            </q-card>
          </q-tab-panel>
          <!-- // TODO: reklam4 -->
          <q-tab-panel name="seven">
            <q-card class="row  col-md-12 col-xs-12 " >
            <q-card-section class="bg-primary text-white col-12 ">
                <div class="text-h6">Reklam4 Resim Yükleme </div>
            </q-card-section>
            <div class="row col-12 justify-center">
                <q-select
                  fill-input
                  input-debounce="0"
                  hide-selected
                  use-input
                  @filter="filterFn"
                  class="q-pa-md col-xs-12 col-6"
                  label="Stok yada Kategori Adı"
                  outlined
                  v-model="edittreemselect"
                  :options="select_options"
                  option-value="_id"
                  option-label="stokturad"
                  auto-select
                ></q-select>
            </div>
            <q-separator></q-separator>
            <anaslidercloud
                v-if="edittreemselect !=''"
                v-on:refreshlist="slider1listrefresh"
                label="Ana Sayfa Reklam4"
                class="row q-pa-md col-12"
                :uploadname="'reklam4'"
                :stokid="edittreemselect._id"
                :stokturad="edittreemselect.stokturad"
                color="white"
                text-color="black"
              >
                <template v-slot:list="scope">
                    
                  <q-list separator>
                    <q-item v-for="file in scope.files" :key="file.name" class="row">
                      <q-item-section class="col-4">
                        <q-item-label class="full-width ellipsis">{{ file.name }}</q-item-label>

                        <q-item-label caption>
                           Durum: {{ file.__status }} 
                        </q-item-label>

                        <q-item-label caption>
                          {{ file.__sizeLabel }} / {{ file.__progressLabel }} 
                        </q-item-label>
                      </q-item-section>
                      <q-item-section class="col-4">
                          
                      </q-item-section>  
                      
                      <q-item-section v-if="file.__img  " thumbnail class="gt-xs col">
                        <img style="object-fit: contain;" :src="file.__img.src" />
                      </q-item-section>
                      
                      <q-item-section   side>
                        <q-btn
                          class="gt-xs"
                          size="14px"
                          flat
                          dense
                          round
                          icon="delete"
                          @click="scope.removeFile(file)"
                        />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </template>
                
            </anaslidercloud>
            <q-separator v-if="val.kategori_link !=''"></q-separator>
            <q-card-section class="bg-primary text-white col-12 ">
                <div class="text-h6">Reklam4 Resim Listesi </div>
            </q-card-section>
            <div class="col-12">
              <q-table
              class="q-pa-md"
                :data="reklam4imgdata"
                :columns="slider1columns"
                row-key="_id"
                selection="single"
                no-data-label="Veri Bulunamadı...!"
                grid
                hide-header
                :pagination.sync="sliderpagination"
              >
                <template v-slot:item="props">
                  <!-- <div
                class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                :style="props.selected ? 'transform: scale(0.95);' : ''"
                  >-->
                  <div class="q-pa-xs row col-xs-12 col-md-4">
                    <!-- <q-card :class="props.selected ? 'bg-grey-2' : ''"> -->
                    <q-card class="col">
                      <q-card-section class="row">
                        <!-- <q-checkbox dense v-model="props.selected" label="Ürün Resmi" ></q-checkbox> -->

                        <q-item-label class="q-pt-md">{{props.row.filename}}</q-item-label>
                        <q-space/>
                        <q-btn
                          @click="reklam4delete(props.row)"
                          icon="delete"
                          color="grey-7"
                          flat
                          round
                        ></q-btn>
                      </q-card-section>
                      <q-separator></q-separator>
                      <q-card-section @click="reklam4sira=true,val=props.row" style="cursor:pointer;position: relative;text-align: center;">
                          <!-- :label="`${props.row.sira}`" -->
                          
                        <q-img
                          :src="props.row.path + props.row.publicid"
                          spinner-color="primary"
                          spinner-size="82px"
                          style="display: inline-block;text-align:center;"
                          
                          
                        ></q-img><div class="text-h2 text-black  text-weight-medium"  style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%)"> {{ props.row.sira }} </div>
                      </q-card-section>
                    </q-card>
                  </div>
                </template>
              </q-table>
            </div>
            </q-card>
          </q-tab-panel>
          <!-- // TODO: stamp -->
          <q-tab-panel name="eight">
            <q-card class="row  col-md-12 col-xs-12 " >
            <q-card-section class="bg-primary text-white col-12 ">
                <div class="text-h6">Mühür Resim Yükleme </div>
            </q-card-section>
            <div class="row col-12 justify-center">
                <q-select
                  fill-input
                  input-debounce="0"
                  hide-selected
                  use-input
                  @filter="filterFn"
                  class="q-pa-md col-xs-12 col-6"
                  label="Stok yada Kategori Adı"
                  outlined
                  v-model="edittreemselect"
                  :options="select_options"
                  option-value="_id"
                  option-label="stokturad"
                  auto-select
                ></q-select>
            </div>
            <q-separator></q-separator>
            <anaslidercloud
                v-if="edittreemselect !=''"
                v-on:refreshlist="slider1listrefresh"
                label="Ana Sayfa Mühür"
                class="row q-pa-md col-12"
                :uploadname="'stamp'"
                :stokid="edittreemselect._id"
                :stokturad="edittreemselect.stokturad"
                color="white"
                text-color="black"
              >
                <template v-slot:list="scope">
                    
                  <q-list separator>
                    <q-item v-for="file in scope.files" :key="file.name" class="row">
                      <q-item-section class="col-4">
                        <q-item-label class="full-width ellipsis">{{ file.name }}</q-item-label>

                        <q-item-label caption>
                           Durum: {{ file.__status }} 
                        </q-item-label>

                        <q-item-label caption>
                          {{ file.__sizeLabel }} / {{ file.__progressLabel }} 
                        </q-item-label>
                      </q-item-section>
                      <q-item-section class="col-4">
                          
                      </q-item-section>  
                      
                      <q-item-section v-if="file.__img  " thumbnail class="gt-xs col">
                        <img style="object-fit: contain;" :src="file.__img.src" />
                      </q-item-section>
                      
                      <q-item-section   side>
                        <q-btn
                          class="gt-xs"
                          size="14px"
                          flat
                          dense
                          round
                          icon="delete"
                          @click="scope.removeFile(file)"
                        />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </template>
                
            </anaslidercloud>
            <q-separator v-if="val.kategori_link !=''"></q-separator>
            <q-card-section class="bg-primary text-white col-12 ">
                <div class="text-h6">Mühür Resim Listesi </div>
            </q-card-section>
            <div class="col-12">
              <q-table
              class="q-pa-md"
                :data="stampimgdata"
                :columns="slider1columns"
                row-key="_id"
                selection="single"
                no-data-label="Veri Bulunamadı...!"
                grid
                hide-header
                :pagination.sync="sliderpagination"
              >
                <template v-slot:item="props">
                  <!-- <div
                class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                :style="props.selected ? 'transform: scale(0.95);' : ''"
                  >-->
                  <div class="q-pa-xs row col-xs-12 col-md-4">
                    <!-- <q-card :class="props.selected ? 'bg-grey-2' : ''"> -->
                    <q-card class="col">
                      <q-card-section class="row">
                        <!-- <q-checkbox dense v-model="props.selected" label="Ürün Resmi" ></q-checkbox> -->

                        <q-item-label class="q-pt-md">{{props.row.filename}}</q-item-label>
                        <q-space/>
                        <q-btn
                          @click="stampdelete(props.row)"
                          icon="delete"
                          color="grey-7"
                          flat
                          round
                        ></q-btn>
                      </q-card-section>
                      <q-separator></q-separator>
                      <q-card-section @click="stampsira=true,val=props.row" style="cursor:pointer;position: relative;text-align: center;">
                          <!-- :label="`${props.row.sira}`" -->
                          
                        <q-img
                          :src="props.row.path + props.row.publicid"
                          spinner-color="primary"
                          spinner-size="82px"
                          style="display: inline-block;text-align:center;"
                          
                          
                        ></q-img><div class="text-h2 text-black  text-weight-medium"  style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%)"> {{ props.row.sira }} </div>
                      </q-card-section>
                    </q-card>
                  </div>
                </template>
              </q-table>
            </div>
            </q-card>
          </q-tab-panel>
        </q-tab-panels>
        
            <q-dialog v-model="slider1sira">
                <q-card style="width: 500px; max-width: 80vw;">
                    <q-card-section class="row items-center">
                    <div class="text-h6 text-center">Resim Sıralaması</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                    </q-card-section>
                <q-separator></q-separator>
                    <q-card-section>
                    <q-input
                        
                        outlined
                        v-model="val.sira"
                        label="Sira"
                        
                    />
                    </q-card-section>
                    <q-separator></q-separator>
                    <q-card-section class="text-right">
                    <q-btn
                        
                        color="primary"
                        label="Güncelle"
                        @click="updateSlider1()"
                        v-close-popup
                    ></q-btn>
                    <!-- <q-btn
                        class="q-mr-md"
                        color="negative"
                        label="Kapat"
                        
                        v-close-popup
                    ></q-btn> -->
                    </q-card-section>
                </q-card>
            </q-dialog>
            <q-dialog v-model="slider2sira">
                <q-card style="width: 500px; max-width: 80vw;">
                    <q-card-section class="row items-center">
                    <div class="text-h6 text-center">Resim Sıralaması</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                    </q-card-section>
              <q-separator></q-separator>
                    <q-card-section>
                    <q-input
                        
                        outlined
                        v-model="val.sira"
                        label="Sira"
                        
                    />
                    </q-card-section>
                    <q-separator></q-separator>
                    <q-card-section class="text-right">
                    <q-btn
                        
                        color="primary"
                        label="Güncelle"
                        @click="updateSlider2()"
                        v-close-popup
                    ></q-btn>
                    <!-- <q-btn
                        class="q-mr-md"
                        color="negative"
                        label="Kapat"
                        
                        v-close-popup
                    ></q-btn> -->
                    </q-card-section>
                </q-card>
            </q-dialog>
            <q-dialog v-model="reklam1sira">
                <q-card style="width: 500px; max-width: 80vw;">
                    <q-card-section class="row items-center">
                    <div class="text-h6 text-center">Reklam1 Sıralaması</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                    </q-card-section>
              <q-separator></q-separator>
                    <q-card-section>
                    <q-input
                        
                        outlined
                        v-model="val.sira"
                        label="Sira"
                        
                    />
                    </q-card-section>
                    <q-separator></q-separator>
                    <q-card-section class="text-right">
                    <q-btn
                        
                        color="primary"
                        label="Güncelle"
                        @click="updateReklam1()"
                        v-close-popup
                    ></q-btn>
                    <!-- <q-btn
                        class="q-mr-md"
                        color="negative"
                        label="Kapat"
                        
                        v-close-popup
                    ></q-btn> -->
                    </q-card-section>
                </q-card>
            </q-dialog>
            <q-dialog v-model="etiket1sira">
                <q-card style="width: 500px; max-width: 80vw;">
                    <q-card-section class="row items-center">
                    <div class="text-h6 text-center">Etiket1 Sıralaması</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                    </q-card-section>
              <q-separator></q-separator>
                    <q-card-section>
                    <q-input
                        
                        outlined
                        v-model="val.sira"
                        label="Sira"
                        
                    />
                    </q-card-section>
                    <q-separator></q-separator>
                    <q-card-section class="text-right">
                    <q-btn
                        
                        color="primary"
                        label="Güncelle"
                        @click="updateEtiket1()"
                        v-close-popup
                    ></q-btn>
                    <!-- <q-btn
                        class="q-mr-md"
                        color="negative"
                        label="Kapat"
                        
                        v-close-popup
                    ></q-btn> -->
                    </q-card-section>
                </q-card>
            </q-dialog>
            <q-dialog v-model="reklam2sira">
                <q-card style="width: 500px; max-width: 80vw;">
                    <q-card-section class="row items-center">
                    <div class="text-h6 text-center">Reklam2 Sıralaması</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                    </q-card-section>
              <q-separator></q-separator>
                    <q-card-section>
                    <q-input
                        
                        outlined
                        v-model="val.sira"
                        label="Sira"
                        
                    />
                    </q-card-section>
                    <q-separator></q-separator>
                    <q-card-section class="text-right">
                    <q-btn
                        
                        color="primary"
                        label="Güncelle"
                        @click="updateReklam2()"
                        v-close-popup
                    ></q-btn>
                    <!-- <q-btn
                        class="q-mr-md"
                        color="negative"
                        label="Kapat"
                        
                        v-close-popup
                    ></q-btn> -->
                    </q-card-section>
                </q-card>
            </q-dialog>
            <q-dialog v-model="reklam3sira">
                <q-card style="width: 500px; max-width: 80vw;">
                    <q-card-section class="row items-center">
                    <div class="text-h6 text-center">Reklam3 Sıralaması</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                    </q-card-section>
              <q-separator></q-separator>
                    <q-card-section>
                    <q-input
                        
                        outlined
                        v-model="val.sira"
                        label="Sira"
                        
                    />
                    </q-card-section>
                    <q-separator></q-separator>
                    <q-card-section class="text-right">
                    <q-btn
                        
                        color="primary"
                        label="Güncelle"
                        @click="updateReklam3()"
                        v-close-popup
                    ></q-btn>
                    <!-- <q-btn
                        class="q-mr-md"
                        color="negative"
                        label="Kapat"
                        
                        v-close-popup
                    ></q-btn> -->
                    </q-card-section>
                </q-card>
            </q-dialog>
            <q-dialog v-model="reklam4sira">
                <q-card style="width: 500px; max-width: 80vw;">
                    <q-card-section class="row items-center">
                    <div class="text-h6 text-center">Reklam4 Sıralaması</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                    </q-card-section>
              <q-separator></q-separator>
                    <q-card-section>
                    <q-input
                        
                        outlined
                        v-model="val.sira"
                        label="Sira"
                        
                    />
                    </q-card-section>
                    <q-separator></q-separator>
                    <q-card-section class="text-right">
                    <q-btn
                        
                        color="primary"
                        label="Güncelle"
                        @click="updateReklam4()"
                        v-close-popup
                    ></q-btn>
                    <!-- <q-btn
                        class="q-mr-md"
                        color="negative"
                        label="Kapat"
                        
                        v-close-popup
                    ></q-btn> -->
                    </q-card-section>
                </q-card>
            </q-dialog>
            <q-dialog v-model="stampsira">
                <q-card style="width: 500px; max-width: 80vw;">
                    <q-card-section class="row items-center">
                    <div class="text-h6 text-center">Mühür Sıralaması</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                    </q-card-section>
              <q-separator></q-separator>
                    <q-card-section>
                    <q-input
                        
                        outlined
                        v-model="val.sira"
                        label="Sira"
                        
                    />
                    </q-card-section>
                    <q-separator></q-separator>
                    <q-card-section class="text-right">
                    <q-btn
                        
                        color="primary"
                        label="Güncelle"
                        @click="updateStamp()"
                        v-close-popup
                    ></q-btn>
                    <!-- <q-btn
                        class="q-mr-md"
                        color="negative"
                        label="Kapat"
                        
                        v-close-popup
                    ></q-btn> -->
                    </q-card-section>
                </q-card>
            </q-dialog>
    </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import {mapGetters } from 'vuex';
import gql from "graphql-tag";
import _ from "lodash";
// import { date } from 'quasar'
import moment from 'moment'
import anaslidercloud from "../../components/anaslidercloud.vue";
    export default {
        components: {
            anaslidercloud,
        },
        data() {
            return {
              tab:"one",
              edittreemselect:"",
              select_options:[],
              // treemselect:[],
              treemmenu: [],
              denemem:[],
                val:{
                    sira:"",
                    kategori_link:""
                    },
                slider1sira:false,
                
                slider1imgdata:[],
                slider1columns: [
                    {
                    name: "adi",
                    label: "resim",
                    align: "left",
                    sortable: true,
                    field: row => row.images.imageurl
                    }
                ],
                sliderpagination: {
                    // sortBy: 'ust',
                    // descending: false,
                    page: 1,
                    rowsPerPage: 10,
                    // rowsNumber: 5,q
                },  
                // ----slider2
                slider2imgdata:[],
                slider2sira:false,
                //-----reklam1
                reklam1imgdata:[],
                reklam1sira:false,
                //-----etiket1
                etiket1imgdata:[],
                etiket1sira:false,
                //-----reklam2
                reklam2imgdata:[],
                reklam2sira:false,
                //-----reklam3
                reklam3imgdata:[],
                reklam3sira:false,
                //-----reklam4
                reklam4imgdata:[],
                reklam4sira:false,
                //-----stamp
                stampimgdata:[],
                stampsira:false,
            }
        },
        
        watch: {
            
        },
        computed: {
          ...mapGetters([
            'anakategorilists',
            
          ]),
        },
        async mounted () {
          await this.$store.dispatch('anakategori')
          console.log(process.env.NODE_ENV);
          // const res = await axios.post('http://'+ process.env.API +':4000/graphql', {
          //   query: `{
          //                 Query {
          //                           stokturad
          //                           _id
          //                           parentid
          //       }
          //     }`,
          //   loadingKey: "loading"
          // });
          // this.denemem = res.data.data.Query;
          // await this.parseTree(this.denemem);
          // let dem = [];
          // await this.treemselected(dem);
            await this.slider1listrefresh()
            // await this.slider2listrefresh()
        },
        methods: {
           async slider1listrefresh(){
                await axios.post( process.env.API , {
                query: `query sliderlist{
                 sliderlist{
                      slider1
                          {
                            _id
                            publicid
                            path
                            filename
                            imageurl
                            stokturad
                            stokid
                            sira
                            
                        }
                      slider2
                          {
                            _id
                            publicid
                            path
                            filename
                            imageurl
                            stokturad
                            stokid
                            sira
                            
                        }
                      reklam1
                          {
                            _id
                            publicid
                            path
                            filename
                            imageurl
                            stokturad
                            stokid
                            sira
                      }
                      etiket1
                          {
                            _id
                            publicid
                            path
                            filename
                            imageurl
                            stokturad
                            stokid
                            sira
                            
                        }
                      reklam2
                          {
                            _id
                            publicid
                            path
                            filename
                            imageurl
                            stokturad
                            stokid
                            sira
                      }
                      reklam3
                          {
                            _id
                            publicid
                            path
                            filename
                            imageurl
                            stokturad
                            stokid
                            sira
                      }
                      reklam4
                          {
                            _id
                            publicid
                            path
                            filename
                            imageurl
                            stokturad
                            stokid
                            sira
                      }
                      stamp
                          {
                            _id
                            publicid
                            path
                            filename
                            imageurl
                            stokturad
                            stokid
                            sira
                      }
                    }
                 }`,
                }).then(async res => {
                        this.slider1imgdata=res.data.data.sliderlist[0].slider1
                        this.slider2imgdata=res.data.data.sliderlist[0].slider2
                        this.reklam1imgdata=res.data.data.sliderlist[0].reklam1
                        this.etiket1imgdata=res.data.data.sliderlist[0].etiket1
                        this.reklam2imgdata=res.data.data.sliderlist[0].reklam2
                        this.reklam3imgdata=res.data.data.sliderlist[0].reklam3
                        this.reklam4imgdata=res.data.data.sliderlist[0].reklam4
                        this.stampimgdata=res.data.data.sliderlist[0].stamp
                        this.slider1imgdata = _.orderBy(this.slider1imgdata, ['sira'],['asc']);
                        this.slider2imgdata = _.orderBy(this.slider2imgdata, ['sira'],['asc']);
                        this.reklam1imgdata = _.orderBy(this.reklam1imgdata, ['sira'],['asc']);
                        this.etiket1imgdata = _.orderBy(this.etiket1imgdata, ['sira'],['asc']);
                        this.reklam2imgdata = _.orderBy(this.reklam2imgdata, ['sira'],['asc']);
                        this.reklam3imgdata = _.orderBy(this.reklam3imgdata, ['sira'],['asc']);
                        this.reklam4imgdata = _.orderBy(this.reklam4imgdata, ['sira'],['asc']);
                        this.stampimgdata = _.orderBy(this.stampimgdata, ['sira'],['asc']);
                    });  
           },
          
           async updateSlider1(){
               this.$apollo
                .mutate({
                    mutation: gql`
                    mutation anasayfaslider1Update($id: ID!, $sayi: Float) {
                        anasayfaslider1Update(id: $id, sayi: $sayi) {
                        _id
                        }
                    }
                    `,
                    variables: {
                    id: this.val._id,
                    sayi: Number(this.val.sira),
                    }
                })
                .then(async data => {
                    await this.slider1listrefresh()
                })
           },
           async updateSlider2(){
               this.$apollo
                .mutate({
                    mutation: gql`
                    mutation anasayfaslider2Update($id: ID!, $sayi: Float) {
                        anasayfaslider2Update(id: $id, sayi: $sayi) {
                        _id
                        }
                    }
                    `,
                    variables: {
                    id: this.val._id,
                    sayi: Number(this.val.sira),
                    }
                })
                .then(async data => {
                    await this.slider1listrefresh()
                })
           },
           async updateReklam1(){
               this.$apollo
                .mutate({
                    mutation: gql`
                    mutation anasayfareklam1Update($id: ID!, $sayi: Float) {
                        anasayfareklam1Update(id: $id, sayi: $sayi) {
                        _id
                        }
                    }
                    `,
                    variables: {
                    id: this.val._id,
                    sayi: Number(this.val.sira),
                    }
                })
                .then(async data => {
                    await this.slider1listrefresh()
                })
           },
           async updateEtiket1(){
               this.$apollo
                .mutate({
                    mutation: gql`
                    mutation anasayfaetiket1Update($id: ID!, $sayi: Float) {
                        anasayfaetiket1Update(id: $id, sayi: $sayi) {
                        _id
                        }
                    }
                    `,
                    variables: {
                    id: this.val._id,
                    sayi: Number(this.val.sira),
                    }
                })
                .then(async data => {
                    await this.slider1listrefresh()
                })
           },
           async updateReklam2(){
               this.$apollo
                .mutate({
                    mutation: gql`
                    mutation anasayfareklam2Update($id: ID!, $sayi: Float) {
                        anasayfareklam2Update(id: $id, sayi: $sayi) {
                        _id
                        }
                    }
                    `,
                    variables: {
                    id: this.val._id,
                    sayi: Number(this.val.sira),
                    }
                })
                .then(async data => {
                    await this.slider1listrefresh()
                })
           },
           async updateReklam3(){
               this.$apollo
                .mutate({
                    mutation: gql`
                    mutation anasayfareklam3Update($id: ID!, $sayi: Float) {
                        anasayfareklam3Update(id: $id, sayi: $sayi) {
                        _id
                        }
                    }
                    `,
                    variables: {
                    id: this.val._id,
                    sayi: Number(this.val.sira),
                    }
                })
                .then(async data => {
                    await this.slider1listrefresh()
                })
           },
           async updateReklam4(){
               this.$apollo
                .mutate({
                    mutation: gql`
                    mutation anasayfareklam4Update($id: ID!, $sayi: Float) {
                        anasayfareklam4Update(id: $id, sayi: $sayi) {
                        _id
                        }
                    }
                    `,
                    variables: {
                    id: this.val._id,
                    sayi: Number(this.val.sira),
                    }
                })
                .then(async data => {
                    await this.slider1listrefresh()
                })
           },
           async updateStamp(){
               this.$apollo
                .mutate({
                    mutation: gql`
                    mutation anasayfastampUpdate($id: ID!, $sayi: Float) {
                        anasayfastampUpdate(id: $id, sayi: $sayi) {
                        _id
                        }
                    }
                    `,
                    variables: {
                    id: this.val._id,
                    sayi: Number(this.val.sira),
                    }
                })
                .then(async data => {
                    await this.slider1listrefresh()
                })
           },
           async imagedelete(val){
            //    console.log("val",val);
               this.$apollo
                .mutate({
                    mutation: gql`
                    mutation deletehomePageimageSlider1($id: ID!, $imageid: ID, $path: String) {
                        deletehomePageimageSlider1(id: $id, imageid: $imageid, path: $path) {
                        _id
                        }
                    }
                    `,
                    variables: {
                    id: val._id,
                    path: val.publicid,
                    imageid: val._id
                    }
                })
                .then(async data => {
                    console.log("Done");
                    // storageRef.delete()
                    await this.slider1listrefresh()
                    // this.resimlistrefresh();
                });

           },
           async image2delete(val){
            //    console.log("val",val);
               this.$apollo
                .mutate({
                    mutation: gql`
                    mutation deletehomePageimageSlider2($id: ID!, $imageid: ID, $path: String) {
                        deletehomePageimageSlider2(id: $id, imageid: $imageid, path: $path) {
                        _id
                        }
                    }
                    `,
                    variables: {
                    id: val._id,
                    path: val.publicid,
                    imageid: val._id
                    }
                })
                .then(async data => {
                    console.log("Done");
                    // storageRef.delete()
                    await this.slider1listrefresh()
                    // this.resimlistrefresh();
                });

           },
           async reklam1delete(val){
            //    console.log("val",val);
               this.$apollo
                .mutate({
                    mutation: gql`
                    mutation deletehomePageimageReklam1($id: ID!, $imageid: ID, $path: String) {
                        deletehomePageimageReklam1(id: $id, imageid: $imageid, path: $path) {
                        _id
                        }
                    }
                    `,
                    variables: {
                    id: val._id,
                    path: val.publicid,
                    imageid: val._id
                    }
                })
                .then(async data => {
                    console.log("Done");
                    // storageRef.delete()
                    await this.slider1listrefresh()
                    // this.resimlistrefresh();
                });

           },
           async etiket1delete(val){
            //    console.log("val",val);
               this.$apollo
                .mutate({
                    mutation: gql`
                    mutation deletehomePageimageEtiket1($id: ID!, $imageid: ID, $path: String) {
                        deletehomePageimageEtiket1(id: $id, imageid: $imageid, path: $path) {
                        _id
                        }
                    }
                    `,
                    variables: {
                    id: val._id,
                    path: val.publicid,
                    imageid: val._id
                    }
                })
                .then(async data => {
                    console.log("Done");
                    // storageRef.delete()
                    await this.slider1listrefresh()
                    // this.resimlistrefresh();
                });

           },
           async reklam2delete(val){
            //    console.log("val",val);
               this.$apollo
                .mutate({
                    mutation: gql`
                    mutation deletehomePageimageReklam2($id: ID!, $imageid: ID, $path: String) {
                        deletehomePageimageReklam2(id: $id, imageid: $imageid, path: $path) {
                        _id
                        }
                    }
                    `,
                    variables: {
                    id: val._id,
                    path: val.publicid,
                    imageid: val._id
                    }
                })
                .then(async data => {
                    console.log("Done");
                    // storageRef.delete()
                    await this.slider1listrefresh()
                    // this.resimlistrefresh();
                });

           },
           async reklam3delete(val){
            //    console.log("val",val);
               this.$apollo
                .mutate({
                    mutation: gql`
                    mutation deletehomePageimageReklam3($id: ID!, $imageid: ID, $path: String) {
                        deletehomePageimageReklam3(id: $id, imageid: $imageid, path: $path) {
                        _id
                        }
                    }
                    `,
                    variables: {
                    id: val._id,
                    path: val.publicid,
                    imageid: val._id
                    }
                })
                .then(async data => {
                    console.log("Done");
                    // storageRef.delete()
                    await this.slider1listrefresh()
                    // this.resimlistrefresh();
                });

           },
           async reklam4delete(val){
            //    console.log("val",val);
               this.$apollo
                .mutate({
                    mutation: gql`
                    mutation deletehomePageimageReklam4($id: ID!, $imageid: ID, $path: String) {
                        deletehomePageimageReklam4(id: $id, imageid: $imageid, path: $path) {
                        _id
                        }
                    }
                    `,
                    variables: {
                    id: val._id,
                    path: val.publicid,
                    imageid: val._id
                    }
                })
                .then(async data => {
                    console.log("Done");
                    // storageRef.delete()
                    await this.slider1listrefresh()
                    // this.resimlistrefresh();
                });

           },
           async stampdelete(val){
            //    console.log("val",val);
               this.$apollo
                .mutate({
                    mutation: gql`
                    mutation deletehomePageimageStamp($id: ID!, $imageid: ID, $path: String) {
                        deletehomePageimageStamp(id: $id, imageid: $imageid, path: $path) {
                        _id
                        }
                    }
                    `,
                    variables: {
                    id: val._id,
                    path: val.publicid,
                    imageid: val._id
                    }
                })
                .then(async data => {
                    console.log("Done");
                    // storageRef.delete()
                    await this.slider1listrefresh()
                    // this.resimlistrefresh();
                });

           },
           checkFileSize (files) {
            return files.filter(file => file.size < 2048)
            },
           onRejected (rejectedEntries) {
            // Notify plugin needs to be installed
            // https://quasar.dev/quasar-plugins/notify#Installation
            this.$q.notify({
                type: 'negative',
                message: `${rejectedEntries.length}. Dosya Büyüklüğünüz Fazla`
            })
            },
            
      
            filterFn(val, update, abort) {
              update(() => {
                const needle = val.toLowerCase();
                this.select_options = this.anakategorilists.filter(v =>
                  v.stokturad.toLowerCase().includes(needle)
                );
              });
    },
        },
    }
</script>

<style lang="scss" scoped>

</style>