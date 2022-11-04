<template>
    <Navbar />
    <section class="about">
        <h1 class="heading"> book <span>store</span> </h1>
        <a-table :columns="columns" :data-source="data" :rowKey="(record) => record.id">
            <template #action="{ record }">
               <a href="javascript:void(0)" @click="showModal(record.id)">แก้ไข</a>
                <a-divider type="vertical" />
                <a href="javascript:void(0)" @click="showConfirmDelete(record.id)">ลบ</a>
            </template>
        </a-table>
    </section>
    <a-button type="primary" @click="showModal">เพิ่มหนังสือ</a-button>
   
    <a-modal v-model:visible="modalVisible" title="เพิ่ม/แก้ไข หนังสือ" @ok="handleOk" okText="บันทึก" cancelText="ยกเลิก">

<a-row>
<a-col :span="6"><label>ชื่อหนังสือ</label></a-col>
<a-col :span="18">
<a-input v-model:value="book.name" placeholder="ชื่อหนังสือ" />
</a-col>
</a-row>
<br />
<a-row>
<a-col :span="6"> <label>ราคา</label>
</a-col>
<a-col :span="18">
<a-input-number v-model:value="book.price" :min="0" :max="5000" />
</a-col>
</a-row>
</a-modal>
</template>

<script>
import Navbar from "../components/Navbar.vue";
const columns = [
{
    title: "Id",
    dataIndex: "id",
    key: "id",
    width: 65,

},
{
    title: "ชื่อหนังสือ",
    dataIndex: "name",
    key: "name",

},
{
    title: "ราคา",
    dataIndex: "name",
    key: "price",
    align: 'right'

},
{
    title: "Action",
    slots: { customRender: "action" },
    key: "id",
    align: 'center',
    width: 150,

},
];
import axios from 'axios';
import { Modal } from 'ant-design-vue';
export default {
    components: { Navbar },
    methods: {
        async getBooks() {
         try {
            let res = await axios.get("http://localhost:3000/books")
            this.data = res.data
    } catch (error) { }
},
    showModal(id) {
        let book = this.data.find(x => x.id == id)
        if (book) {
        this.book = { ...book }
        } else {
        this.book = {
            id: null,
            name: null,
            price: 0,
          };
        }
        this.modalVisible = true
    },
    async handleOk() {
        try {
            let res = this.book.id ? await axios.put("http://localhost:3000/books/" + this.book.id, this.book) : await axios.post("http://localhost:3000/books", this.book)

      if (res)
      this.modalVisible = false

} catch (error) { } finally { this.getBooks() }
},
 showConfirmDelete(id) {
      let book = this.data.find((x) => x.id == id);
      Modal.confirm({
        title: "ลบข้อมูล",
        content: "คุณต้องการลบหนังสือ " + book.name + " หรือไม่?",
        okText: "ลบ",
        cancelText: "ยกเลิก",
        onOk: async () => {
          try {
            let res = await axios.delete(
              "http://localhost:3000/books/" + book.id
            );
          } catch (error) {
          } finally {
            this.getBooks();
          }
        },
      });
    },
},
    data() {
        return {
            columns: columns,
            data: [],
            modalVisible: false,
            book: {
                id: null,
                name: null,
                price: 0,

            },
        };
    },
    beforeMount() {
        this.getBooks();
    },
};
</script>
<style>
</style>