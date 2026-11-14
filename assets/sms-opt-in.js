/* Preserves the original form behavior: browser-local opt-in record, never transmitted. */
(function () {
  'use strict';
  const form = {
    businessName: document.getElementById('business-name'),
    customerName: document.getElementById('customer-name'),
    phone: document.getElementById('customer-phone'),
    email: document.getElementById('customer-email'),
    appointmentTime: document.getElementById('appointment-time'),
    consent: document.getElementById('sms-consent'),
    button: document.getElementById('submit-consent'),
    clearButton: document.getElementById('clear-form'),
    result: document.getElementById('result')
  };
  if (!form.button) return;
  function showResult(type, html) {
    form.result.className = 'result ' + type;
    form.result.innerHTML = html;
    form.result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  function markInvalid(input, invalid) { input.classList.toggle('invalid', invalid); }
  function val(input) { return String(input.value || '').trim(); }
  function escapeHtml(str) {
    return String(str).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
  }
  function isValidPhone(s) { const digits = s.replace(/[^\d]/g, ''); return digits.length >= 10 && digits.length <= 15; }
  function isValidEmail(s) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s); }
  function formatAppointment(s) {
    if (!s) return '';
    const date = new Date(s);
    if (Number.isNaN(date.getTime())) return s;
    return new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }).format(date);
  }
  function downloadConsentRecord(record) {
    const blob = new Blob([JSON.stringify(record, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const safeName = record.customerName.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'') || 'customer';
    a.href = url; a.download = 'appointment-air-sms-consent-' + safeName + '.json'; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  form.button.addEventListener('click', () => {
    const businessName=val(form.businessName), customerName=val(form.customerName), phone=val(form.phone), email=val(form.email), appointmentTime=val(form.appointmentTime);
    const invalid=[!businessName, !customerName, !isValidPhone(phone), !isValidEmail(email), !appointmentTime];
    const inputs=[form.businessName,form.customerName,form.phone,form.email,form.appointmentTime];
    inputs.forEach((el,i) => markInvalid(el, invalid[i]));
    const messages=['Enter the business or service provider name.','Enter your name.','Enter a valid mobile phone number.','Enter a valid email address.','Enter the appointment date and time requested or previously booked.'];
    const errors=messages.filter((_,i)=>invalid[i]);
    if(errors.length){showResult('error','<p class="result-title">Some information needs to be fixed.</p><p>Correct the highlighted fields before preparing your local SMS opt-in record.</p><ul>'+errors.map(e=>'<li>'+e+'</li>').join('')+'</ul>');return;}
    if(!form.consent.checked){showResult('warning','<p class="result-title">SMS opt-in was not selected.</p><p>The optional checkbox remains unchecked. No opt-in record was prepared. You can contact the business directly for appointment assistance.</p>');return;}
    const consentLanguage='I agree to receive SMS follow-ups about an appointment booking or rescheduling request I initiated with the business or service provider named above using Appointment Air LLC. Message frequency varies based on appointment activity. Message and data rates may apply. Reply HELP for help or STOP to opt out.';
    const record={businessName,customerName,phone,email,appointmentTime:formatAppointment(appointmentTime),recordCreatedAt:new Date().toISOString(),smsConsentSelected:true,submittedToBusiness:false,finalEmailConfirmationStatus:'not sent by this page',consentLanguage};
    showResult('success', '<p class="result-title">✓ Local SMS opt-in record prepared.</p><p>You selected optional SMS follow-ups for your appointment request with <strong>'+escapeHtml(businessName)+'</strong> using Appointment Air LLC.</p><div class="important"><p><strong>Prepared in your browser only. This record was NOT transmitted to Appointment Air or the business.</strong> Contact the business directly to request real booking, rescheduling, or follow-up assistance.</p></div><div class="confirmation-box"><p><strong>Name:</strong> '+escapeHtml(customerName)+'</p><p><strong>Mobile phone:</strong> '+escapeHtml(phone)+'</p><p><strong>Confirmation email:</strong> '+escapeHtml(email)+'</p><p><strong>Appointment:</strong> '+escapeHtml(formatAppointment(appointmentTime))+'</p><p><strong>SMS opt-in:</strong> selected locally, not submitted</p></div><p>For active SMS conversations, reply <strong>STOP</strong> to opt out or <strong>HELP</strong> for help.</p><p><button class="button secondary" type="button" id="download-consent">Download local opt-in record</button></p>');
    document.getElementById('download-consent')?.addEventListener('click',()=>downloadConsentRecord(record));
  });
  form.clearButton.addEventListener('click',()=>{ [form.businessName,form.customerName,form.phone,form.email,form.appointmentTime].forEach(el=>{el.value='';markInvalid(el,false)});form.consent.checked=false;form.result.className='result';form.result.replaceChildren(); });
})();
