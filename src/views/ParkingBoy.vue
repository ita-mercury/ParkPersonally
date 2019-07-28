<template>
    <div class="parking-lot-div">
    <Table border :columns="columns" :data="data">

      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
        <Button type="error" size="small" @click="remove(index)">Delete</Button>
      </template>
    </Table>
    <Button type="error" class="new-btn" size="large">+</Button>
  </div>
</template>

<script>
import expandRow from '../components/Table-expand.vue';
export default {
    components: { expandRow },
    data () {
        return {
            columns: [
                {
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        return h(expandRow, {
                            props: {
                                row: params.row
                            }
                        })
                    }
                },
                {
                    title:'id',
                    key:'id'
                },
                {
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Phone',
                    key: 'phone'
                },
                {
                    title: 'Status',
                    key: 'status'
                },
                {
                    title: 'Action',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            data: [
                {
                    id:1,
                    name: 'Matthew',
                    phone: 18888888,
                    status: 1,
                },
                {
                    id:2,
                    name: 'Dillon',
                    phone: 16666666,
                    status: 2,
                    parkingLot:["lot1","lot2"]
                },
                {
                    id:3,
                    name: 'Sharon',
                    phone: 19999999,
                    status: 2,
                    parkingLot:["lot1","lot2"]
                },
                {
                    id:4,
                    name: 'Eric',
                    phone: 17777777,
                    status: 1,
                    parkingLot:["lot1","lot2"]
                }
            ]
        }
    }
}

</script>


<style>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
