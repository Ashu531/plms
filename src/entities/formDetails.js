class Lead {
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

}