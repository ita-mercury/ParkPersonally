<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <Row class="expand-row">
            <Col>
            <Transfer :data="data" 
                        :titles="title"
                        :target-keys="targetKeys"
                        filterable
                        :filter-method="filterMethod"
                        @on-change="handleChange2" 
                        ></Transfer>
            <Transfer :titles="title1"></Transfer>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        props: {
            parkingBoy: Object
        },
        data () {
            return {
                data: this.getData(),
                targetKeys: this.getTargetKeys(),
                title:['可选停车场','已有停车场'],
                title1:['可选tag','已有tag']
            }
        },
        methods: {
            getData () {
                //该方法返回一个数组,数组的元素含key和label两个属性
                //数组内的元素就是两个穿梭框里的所有内容
                //查经理管理的所有停车场
                //key值为停车场id,
                //label值为停车场名字
                let allParkingLot=[
                    {"key":"1","label":"lot1"},
                    {"key":"2","label":"lot2"},
                    {"key":"3","label":"lot3"},
                ]
                return allParkingLot;
            },
            getTargetKeys () {
                //该方法返回一个数组,数组元素是停车场id
                //该方法返回的停车场id
                //会将对应停车场放到右边的穿梭框
                return ["1"]
            },
            handleChange2 (newTargetKeys) {
                this.targetKeys = newTargetKeys;
            },
            filterMethod (data, query) {
                return data.label.indexOf(query) > -1;
            }
        }
    }
</script>
<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
