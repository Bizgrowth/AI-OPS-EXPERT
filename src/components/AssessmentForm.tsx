import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AssessmentFormProps {
  assessmentType: 'business_readiness' | 'roi_viability' | 'implementation_readiness';
  onClose: () => void;
}

const AssessmentForm: React.FC<AssessmentFormProps> = ({ assessmentType, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('assessment_submissions')
        .insert({
          assessment_type: assessmentType,
          company_name: formData.company_name || null,
          industry: formData.industry || null,
          contact_name: formData.contact_name,
          contact_email: formData.contact_email,
          contact_phone: formData.contact_phone || null,
          responses: formData,
          status: 'submitted'
        });

      if (error) throw error;

      try {
        const emailApiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-assessment-email`;
        await fetch(emailApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            assessmentType,
            contactName: formData.contact_name,
            contactEmail: formData.contact_email,
            contactPhone: formData.contact_phone,
            companyName: formData.company_name,
            industry: formData.industry,
            responses: formData,
          }),
        });
      } catch (emailErr) {
        console.error('Assessment email notification failed (non-blocking):', emailErr);
      }

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error submitting assessment:', error);
      alert('There was an error submitting your assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Assessment Submitted!</h3>
          <p className="text-gray-300">
            Thank you for completing the assessment. We'll review your responses and get back to you shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen flex items-start justify-center p-4 py-8">
        <div className="bg-slate-800 rounded-2xl p-6 sm:p-8 max-w-3xl w-full relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {assessmentType === 'business_readiness' && 'Business Readiness Assessment'}
              {assessmentType === 'roi_viability' && 'ROI Viability Analysis'}
              {assessmentType === 'implementation_readiness' && 'Implementation Readiness Check'}
            </h2>
            <p className="text-gray-400">
              Please answer the following questions to help us understand your needs
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {assessmentType === 'business_readiness' && <BusinessReadinessForm formData={formData} updateField={updateField} />}
            {assessmentType === 'roi_viability' && <ROIViabilityForm formData={formData} updateField={updateField} />}
            {assessmentType === 'implementation_readiness' && <ImplementationReadinessForm formData={formData} updateField={updateField} />}

            <div className="flex justify-end space-x-4 pt-4 border-t border-slate-700">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const BusinessReadinessForm: React.FC<{ formData: Record<string, string>; updateField: (field: string, value: string) => void }> = ({ formData, updateField }) => (
  <>
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">Company Info</h3>
      <input
        type="text"
        placeholder="Business name"
        value={formData.company_name || ''}
        onChange={(e) => updateField('company_name', e.target.value)}
        className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
      />
      <input
        type="text"
        placeholder="Industry"
        value={formData.industry || ''}
        onChange={(e) => updateField('industry', e.target.value)}
        className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
      />
      <input
        type="text"
        placeholder="Primary contact"
        required
        value={formData.contact_name || ''}
        onChange={(e) => updateField('contact_name', e.target.value)}
        className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
      />
      <input
        type="email"
        placeholder="Email"
        required
        value={formData.contact_email || ''}
        onChange={(e) => updateField('contact_email', e.target.value)}
        className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
      />
      <input
        type="tel"
        placeholder="Phone"
        value={formData.contact_phone || ''}
        onChange={(e) => updateField('contact_phone', e.target.value)}
        className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
      />
    </div>

    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">Current Process Questions</h3>
      <div>
        <label className="block text-gray-300 mb-2">1. Describe the process you want to automate in 2-3 sentences</label>
        <textarea
          value={formData.process_description || ''}
          onChange={(e) => updateField('process_description', e.target.value)}
          rows={3}
          className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
        />
      </div>
      <div>
        <label className="block text-gray-300 mb-2">2. Who is currently responsible for this process?</label>
        <input
          type="text"
          value={formData.process_owner || ''}
          onChange={(e) => updateField('process_owner', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
        />
      </div>
      <div>
        <label className="block text-gray-300 mb-2">3. Is this process documented anywhere?</label>
        <select
          value={formData.is_documented || ''}
          onChange={(e) => updateField('is_documented', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="">Select an option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="partially">Partially</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-300 mb-2">4. How many hours per week does this process take?</label>
        <input
          type="number"
          value={formData.hours_per_week || ''}
          onChange={(e) => updateField('hours_per_week', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
        />
      </div>
      <div>
        <label className="block text-gray-300 mb-2">5. How many people are involved?</label>
        <input
          type="number"
          value={formData.people_involved || ''}
          onChange={(e) => updateField('people_involved', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
        />
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">Data Questions</h3>
      <div>
        <label className="block text-gray-300 mb-2">6. Where is the data for this process currently stored?</label>
        <div className="space-y-2">
          {['Spreadsheets', 'Software', 'Paper', 'Email', 'Other'].map((option) => (
            <label key={option} className="flex items-center space-x-2 text-gray-300">
              <input
                type="checkbox"
                checked={formData[`data_storage_${option.toLowerCase()}`] === 'true'}
                onChange={(e) => updateField(`data_storage_${option.toLowerCase()}`, e.target.checked ? 'true' : 'false')}
                className="w-4 h-4 bg-slate-700 border-slate-600 rounded"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-gray-300 mb-2">7. Can you easily export or access this data?</label>
        <select
          value={formData.data_accessible || ''}
          onChange={(e) => updateField('data_accessible', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="">Select an option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="dont_know">Don't know</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-300 mb-2">8. How often is this data updated?</label>
        <select
          value={formData.data_update_frequency || ''}
          onChange={(e) => updateField('data_update_frequency', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="">Select an option</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="as_needed">As needed</option>
        </select>
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">Integration Questions</h3>
      <div>
        <label className="block text-gray-300 mb-2">9. What tools/software does this process currently use?</label>
        <input
          type="text"
          placeholder="Tool 1"
          value={formData.tool_1 || ''}
          onChange={(e) => updateField('tool_1', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 mb-2"
        />
        <input
          type="text"
          placeholder="Tool 2"
          value={formData.tool_2 || ''}
          onChange={(e) => updateField('tool_2', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 mb-2"
        />
        <input
          type="text"
          placeholder="Tool 3"
          value={formData.tool_3 || ''}
          onChange={(e) => updateField('tool_3', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
        />
      </div>
      <div>
        <label className="block text-gray-300 mb-2">10. Do you have admin access to these tools?</label>
        <select
          value={formData.admin_access || ''}
          onChange={(e) => updateField('admin_access', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="">Select an option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="dont_know">Don't know</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-300 mb-2">11. Who manages your IT/tech decisions?</label>
        <input
          type="text"
          placeholder="e.g., Me, IT Department, Outside vendor"
          value={formData.it_manager || ''}
          onChange={(e) => updateField('it_manager', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
        />
      </div>
    </div>
  </>
);

const ROIViabilityForm: React.FC<{ formData: Record<string, string>; updateField: (field: string, value: string) => void }> = ({ formData, updateField }) => (
  <>
    <div className="space-y-4">
      <div>
        <label className="block text-gray-300 mb-2">Contact Name</label>
        <input
          type="text"
          required
          value={formData.contact_name || ''}
          onChange={(e) => updateField('contact_name', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
        />
      </div>
      <div>
        <label className="block text-gray-300 mb-2">Email</label>
        <input
          type="email"
          required
          value={formData.contact_email || ''}
          onChange={(e) => updateField('contact_email', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
        />
      </div>
      <div>
        <label className="block text-gray-300 mb-2">Phone (optional)</label>
        <input
          type="tel"
          value={formData.contact_phone || ''}
          onChange={(e) => updateField('contact_phone', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
        />
      </div>
    </div>

    <div className="space-y-4">
      <div>
        <label className="block text-gray-300 mb-2">1. What process are you considering automating?</label>
        <textarea
          value={formData.process_description || ''}
          onChange={(e) => updateField('process_description', e.target.value)}
          rows={2}
          className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
        />
      </div>
      <div>
        <label className="block text-gray-300 mb-2">2. How many hours per week does your team spend on this?</label>
        <select
          value={formData.hours_per_week || ''}
          onChange={(e) => updateField('hours_per_week', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="">Select an option</option>
          <option value="1-5">1-5 hours</option>
          <option value="5-10">5-10 hours</option>
          <option value="10-20">10-20 hours</option>
          <option value="20+">20+ hours</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-300 mb-2">3. How many people are involved?</label>
        <select
          value={formData.people_involved || ''}
          onChange={(e) => updateField('people_involved', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="">Select an option</option>
          <option value="1">1 person</option>
          <option value="2-3">2-3 people</option>
          <option value="4-5">4-5 people</option>
          <option value="6+">6+ people</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-300 mb-2">4. What's the approximate hourly cost of the people doing this work?</label>
        <select
          value={formData.hourly_cost || ''}
          onChange={(e) => updateField('hourly_cost', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="">Select an option</option>
          <option value="15-25">$15-25/hour</option>
          <option value="25-40">$25-40/hour</option>
          <option value="40-60">$40-60/hour</option>
          <option value="60+">$60+/hour</option>
          <option value="dont_know">Don't know</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-300 mb-2">5. How often do errors occur in this process?</label>
        <select
          value={formData.error_frequency || ''}
          onChange={(e) => updateField('error_frequency', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="">Select an option</option>
          <option value="rarely">Rarely</option>
          <option value="sometimes">Sometimes</option>
          <option value="often">Often</option>
          <option value="constantly">Constantly</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-300 mb-2">6. When errors happen, how long does it take to fix?</label>
        <select
          value={formData.error_fix_time || ''}
          onChange={(e) => updateField('error_fix_time', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="">Select an option</option>
          <option value="15min">15 min</option>
          <option value="1hour">1 hour</option>
          <option value="several_hours">Several hours</option>
          <option value="varies">Varies</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-300 mb-2">7. What's your budget range for automation?</label>
        <select
          value={formData.budget_range || ''}
          onChange={(e) => updateField('budget_range', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="">Select an option</option>
          <option value="under_500">Under $500</option>
          <option value="500-1000">$500-1,000</option>
          <option value="1000-2500">$1,000-2,500</option>
          <option value="2500+">$2,500+</option>
        </select>
      </div>
    </div>
  </>
);

const ImplementationReadinessForm: React.FC<{ formData: Record<string, string>; updateField: (field: string, value: string) => void }> = ({ formData, updateField }) => (
  <>
    <div className="space-y-4">
      <div>
        <label className="block text-gray-300 mb-2">Contact Name</label>
        <input
          type="text"
          required
          value={formData.contact_name || ''}
          onChange={(e) => updateField('contact_name', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
        />
      </div>
      <div>
        <label className="block text-gray-300 mb-2">Email</label>
        <input
          type="email"
          required
          value={formData.contact_email || ''}
          onChange={(e) => updateField('contact_email', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
        />
      </div>
      <div>
        <label className="block text-gray-300 mb-2">Phone (optional)</label>
        <input
          type="tel"
          value={formData.contact_phone || ''}
          onChange={(e) => updateField('contact_phone', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
        />
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">Team & Culture Questions</h3>
      <div>
        <label className="block text-gray-300 mb-2">1. Who will use this AI solution daily?</label>
        <input
          type="text"
          value={formData.daily_users || ''}
          onChange={(e) => updateField('daily_users', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
        />
      </div>
      <div>
        <label className="block text-gray-300 mb-2">2. How would you rate their comfort with technology?</label>
        <select
          value={formData.tech_comfort || ''}
          onChange={(e) => updateField('tech_comfort', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="">Select an option</option>
          <option value="very_comfortable">Very comfortable - early adopters</option>
          <option value="comfortable">Comfortable - use tools daily</option>
          <option value="moderate">Moderate - can learn with training</option>
          <option value="uncomfortable">Uncomfortable - prefer familiar methods</option>
          <option value="very_uncomfortable">Very uncomfortable - resist new tools</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-300 mb-2">3. Have you successfully implemented new tools/processes in the past year?</label>
        <select
          value={formData.past_implementation || ''}
          onChange={(e) => updateField('past_implementation', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="">Select an option</option>
          <option value="yes_smooth">Yes, went smoothly</option>
          <option value="yes_delayed">Yes, but took longer than expected</option>
          <option value="yes_resistance">Yes, but some team resistance</option>
          <option value="no_failed">No, or last attempt failed</option>
          <option value="first_time">This would be our first</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-300 mb-2">4. What happened? (brief description)</label>
        <textarea
          value={formData.implementation_story || ''}
          onChange={(e) => updateField('implementation_story', e.target.value)}
          rows={2}
          className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
        />
      </div>
      <div>
        <label className="block text-gray-300 mb-2">5. Who is driving this automation initiative?</label>
        <select
          value={formData.initiative_driver || ''}
          onChange={(e) => updateField('initiative_driver', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="">Select an option</option>
          <option value="leadership">Owner/Leadership (mandate from top)</option>
          <option value="team">Team request (staff want this)</option>
          <option value="mutual">Mutual (both leadership and team want it)</option>
          <option value="leadership_only">Leadership only (team doesn't know yet)</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-300 mb-2">6. Has the team been involved in planning this automation?</label>
        <select
          value={formData.team_involvement || ''}
          onChange={(e) => updateField('team_involvement', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="">Select an option</option>
          <option value="excited">Yes, they're excited about it</option>
          <option value="cautious">Somewhat, they're cautiously interested</option>
          <option value="open">No, but they'll be open to it</option>
          <option value="resistant">No, and they might resist</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-300 mb-2">7. What's your biggest concern about implementation?</label>
        <select
          value={formData.biggest_concern || ''}
          onChange={(e) => updateField('biggest_concern', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="">Select an option</option>
          <option value="wont_use">Team won't use it</option>
          <option value="complicated">Too complicated</option>
          <option value="break">Will break/cause problems</option>
          <option value="learning_time">Takes too long to learn</option>
          <option value="other">Other</option>
        </select>
      </div>
      {formData.biggest_concern === 'other' && (
        <div>
          <label className="block text-gray-300 mb-2">Please specify:</label>
          <input
            type="text"
            value={formData.concern_other || ''}
            onChange={(e) => updateField('concern_other', e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
          />
        </div>
      )}
      <div>
        <label className="block text-gray-300 mb-2">8. How much time can you dedicate to training/setup?</label>
        <select
          value={formData.training_time || ''}
          onChange={(e) => updateField('training_time', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="">Select an option</option>
          <option value="whatever_it_takes">Whatever it takes</option>
          <option value="2-3_hours">2-3 hours total</option>
          <option value="30_min_per_person">30 minutes per person</option>
          <option value="limited">Very limited time</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-300 mb-2">9. What's your timeline expectation?</label>
        <select
          value={formData.timeline || ''}
          onChange={(e) => updateField('timeline', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="">Select an option</option>
          <option value="this_week">Need it working this week</option>
          <option value="within_month">Within a month</option>
          <option value="2-3_months">Within 2-3 months</option>
          <option value="flexible">Flexible timeline</option>
        </select>
      </div>
    </div>
  </>
);

export default AssessmentForm;