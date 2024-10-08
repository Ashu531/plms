export default class Lead {
        #leadId;
        #studentName;
        #institute;
        #mobile;
        #email;
        #borrowerName;
        #course;
        #courseFee;
        #loanAmount;
        #tenure;
        #advanceEmi;

    constructor(
        leadId,
        studentName,
        institute,
        mobile,
        email,
        borrowerName,
        course,
        courseFee,
        loanAmount,
        tenure,
        advanceEmi
    ){
        this.#leadId = leadId,
        this.#studentName = studentName,
        this.#institute = institute,
        this.#mobile = mobile,
        this.#email = email,
        this.#borrowerName = borrowerName,
        this.#course = course,
        this.#courseFee = courseFee,
        this.#loanAmount = loanAmount,
        this.#tenure = tenure,
        this.#advanceEmi = advanceEmi
    }

    get leadId() {
        return this.#leadId;
    }

    get studentName() {
        return this.#studentName;
    }

    get institute() {
        return this.#institute;
    }

    get mobile() {
        return this.#mobile;
    }

    get email() {
        return this.#email;
    }

    get borrowerName() {
        return this.#borrowerName;
    }

    get course() {
        return this.#course;
    }

    get courseFee() {
        return this.#courseFee;
    }

    get loanAmount() {
        return this.#loanAmount;
    }

    get tenure() {
        return this.#tenure;
    }

    get advanceEmi() {
        return this.#advanceEmi;
    }

    set leadId(leadId) {
        this.#leadId = leadId;
    }

    set studentName(studentName) {
        this.#studentName = studentName;
    }

    set institute(institute) {
        this.#institute = institute;
    }

    set mobile(mobile) {
        this.#mobile = mobile;
    }

    set email(email) {
        this.#email = email;
    }

    set borrowerName(borrowerName) {
        this.#borrowerName = borrowerName;
    }

    set course(course) {
        this.#course = course;
    }

    set courseFee(courseFee) {
        this.#courseFee = courseFee;
    }

    set loanAmount(loanAmount) {
        this.#loanAmount = loanAmount;
    }

    set tenure(tenure) {
        this.#tenure = tenure;
    }

    set advanceEmi(advanceEmi) {
        this.#advanceEmi = advanceEmi;
    }


    

}

export const leadState = {
    leadId: '',
    studentName: '',
    institute: '',
    mobile: '',
    email: '',
    borrowerName: '',
    course: '',
    courseFee: '',
    loanAmount: '',
    tenure: '',
    advanceEmi: '-1'
}

export const requestData = (formData) => {
    return {
        // "leadId": formData.leadId,
        "student_name": formData.studentName,
        "college": formData.institute,
        "applicant_phone": formData.mobile,
        "applicant_email": formData.email,
        "nameSameAsBorrower": formData.studentName == formData.borrowerName,
        "borrower_name": formData.borrowerName,
        "course": formData.course,
        "course_fee": formData.courseFee,
        "loan_amount": formData.loanAmount,
        "tenure": formData.tenure,
        "advance_emi": formData.advanceEmi,
        "borrowerUuid": formData.borrowerUuid,
        "id": formData?.id,
    }
}