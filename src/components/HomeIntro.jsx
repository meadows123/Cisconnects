import React from 'react';
import { motion } from 'framer-motion';

const HomeIntro = () => {
  return (
    <section className="relative py-16 md:py-24 px-4 bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            What Is an <span className="text-gradient">AIOps Platform</span>?
          </h2>
          <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
            <p>
              Running modern IT infrastructure without the right tools means constant firefighting: outages nobody saw coming, tickets piling up, and engineers spending more time patching problems than building anything new. That's the gap Conxiea's AIOps platform was built to close.
            </p>
            <p>
              An AIOps platform brings artificial intelligence into the day-to-day running of your network, applying machine learning to the flood of logs, metrics, and alerts that traditional monitoring tools simply dump on a human to sort through. Instead of an engineer chasing down which of a hundred alerts actually matters, the platform correlates events, surfaces the real root cause, and, where it's safe to do so, resolves the issue automatically. That's the foundation of genuine AI network automation: not just dashboards that tell you something is wrong, but a system that understands your infrastructure well enough to act on it.
            </p>
            <p>
              For UK businesses juggling hybrid cloud, multi-site offices, and lean IT teams, this shift matters more than ever. Our network automation services are designed around that reality, covering everything from firewall migrations and cloud network changes to routine configuration management, so your team spends less time on repetitive manual work and more time on projects that actually move the business forward. Clients typically see a 30-50% reduction in repetitive operational effort and up to 60% lower manual overhead within months of deployment.
            </p>
            <p>
              Whether you're modernising a single data centre or coordinating infrastructure across dozens of UK sites, Conxiea's combination of an intelligent AIOps platform and hands-on network automation services gives your engineers the leverage of a much larger team, without the headcount, the burnout, or the 3am pages.
            </p>
            <p>
              From the first health check to full self-healing rollout, our engineers work as an extension of your team, not a call centre reading from a script. If you're ready to see what proper AI network automation can do for your infrastructure, book a free consultation and we'll show you exactly where the quick wins are.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeIntro;
