import { defineComponent, onBeforeMount, ref } from 'vue';
import {
  SearchCustomerDto,
  textValidatorToFixed3,
} from '@formation/shared-lib';

export default defineComponent({
  name: 'ClientEditComponent',
  methods: {
    formSubmission() {
      this.editForm.chronoClient = this.chronoClient;
      this.$emit("onFormSubmit", this.editForm)
      this.setPoppingUpToFalse()
    },
    setPoppingUpToFalse() {
      this.$emit('onPoppingUpToFalse', false)
    }
  },
  setup() {
    const initialEditForm = {
      /// chronoClient isn't editable but we need it to identify
      // the client id
      chronoClient: '',
      nom: '',
      prenom: '',
      codePostal: '',
      ville: '',
      actif: '',
    };
    /// Need to omit "codeFichierPartenaire" as we aren't touching it
    const editForm =
      ref<Omit<SearchCustomerDto, 'codeFichierPartenaire'>>(initialEditForm);

    return {
      initialEditForm,
      editForm,
      textValidatorToFixed3,
    };
  },
  props: {
    poppingUp: {
      type: Boolean,
      required: true,
    },
    chronoClient: {
      type: String,
      required: true,
    },
  },
});
