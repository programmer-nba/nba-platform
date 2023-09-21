<template>
    <ion-item>
        <ion-input id="date" v-model="date" type="month" @change="chooseDate()" variant="outlined" density="comfortable" />
    </ion-item>

    <ion-list v-if="date_item.length !== 0">
        <ion-item v-for="item in date_item">
            <ion-label>
                <h3>{{ item.name }}</h3>
                <p>{{ datetimeFormat(item.timestamp) }}</p>
            </ion-label>
            <p slot="end" :class="(item.type === 'เข้า' ? 'text-green' : 'text-red')">
                {{ (item.type === 'เข้า' ? '+' : '-') }} {{ item.amount }}</p>

        </ion-item>
    </ion-list>

    <div v-else class="text-center">
        <p><em>--ไม่มีรายการแจ้งเติมเงิน--</em></p>
    </div>
</template>

<script lang="ts">
import {
    IonPage,
    IonLabel,
    IonInput,
    IonList,
    IonItem,

} from '@ionic/vue';
import { HistoryWallet } from "@/model/historywallet.interface";
import { UserService } from "@/services/user";
import { defineComponent } from 'vue';
import { listOutline, close } from 'ionicons/icons';
import { datetimeFormat, dayjs } from '@/services/fun';
export default defineComponent({
    setup() {
        const userservice = new UserService(null);
        return {
            userservice,
            listOutline,
            close,
            datetimeFormat,
            dayjs
        }
    },

    components: {
        IonPage, IonInput, IonList, IonItem, IonLabel
    },
    data() {
        return {
            loading: false,
            history: [] as HistoryWallet[],
            amount: null,
            dialog: false,
            id_dialog: null,
            id: null,
            detail: '' as any,
            OpenModal: false,
            date_item: '' as any,
            date: dayjs(Date.now()).format('YYYY-MM'),
        }
    },
    methods: {
        chooseDate() {
            this.date_item = this.history.filter((el) => dayjs(el.timestamp).format('YYYY-MM') === dayjs(this.date).format('YYYY-MM'));
        },
        openDailog(detail: string) {
            this.OpenModal = true;
            this.detail = detail;
            console.log('Detail', detail);
        },
        dismiss() {
            this.OpenModal = false;
        },
    },
    async mounted() {
        //Get History 
        await this.userservice.GetHistoryWalletMember().then((result: any | null) => {
            console.log(result);
            this.history = result.data.reverse();
            this.chooseDate();
        })
    },
})
</script>

<style>
.text-green {
    color: rgb(5, 168, 5);
}

.text-red {
    color: red;
}

.text-center {
    margin-top: 15%;
    text-align: center;
    font-size: 18px;
}

ion-modal#example-modal {
    --width: fit-content;
    --width: 85%;
    --height: fit-content;
    --border-radius: 6px;
    --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
}

ion-modal#example-modal h1 {
    margin: 20px 20px 10px 20px;
}

ion-modal#example-modal ion-icon {

    width: 25px;
    height: 48px;

    padding: 4px 0;

    color: white;
}

.toolbar {
    padding-left: 10px;
    color: white;
    --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
}

.detail {
    padding: 20px;
}
</style>