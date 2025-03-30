function whoisLookup() {
    return {
        domain: '',
        infoType: 'domain',
        dataFetched: false,
        whoisData: null,
        domainData: '',
        contactData: '',
        result: '',
        loading: false,

        async fetchWhois() {
            if (!this.domain) {
                alert("Please enter a domain name.");
                return;
            }

            this.loading = true;
            this.result = "";
            this.dataFetched = false;

            try {
                const response = await fetch(`http://localhost:5000/whois?domain=${this.domain}`);
                const data = await response.json();

                if (data.ErrorMessage) {
                    this.result = `<p style="color:red;">${data.ErrorMessage.msg}</p>`;
                    return;
                }

                // Store data for later use
                this.whoisData = data.WhoisRecord || data.registryData || {};
                this.dataFetched = true;

                // Generate Domain Information Table
                let domainOutput = `<h3 class="text-lg font-bold mb-2 sm:hidden">Domain Information</h3>
                <table border="1" class="w-full border-collapse border border-gray-300 text-sm hidden sm:table">
                    <thead>
                        <tr class="bg-gray-200">
                            <th class="p-2 border-r border-white">Domain Name</th>
                            <th class="p-2 border-r border-white">Registrar</th>
                            <th class="p-2 border-r border-white">Registration Date</th>
                            <th class="p-2 border-r border-white">Expiration Date</th>
                            <th class="p-2 border-r border-white">Estimated Domain Age</th>
                            <th class="p-2">Hostnames</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="p-2 border">${this.whoisData.domainName || "N/A"}</td>
                            <td class="p-2 border">${this.whoisData.registrarName || "N/A"}</td>
                            <td class="p-2 border">${this.whoisData.registryData?.createdDate || this.whoisData.createdDate || "N/A"}</td>
                            <td class="p-2 border">${this.whoisData.registryData?.expiresDate || this.whoisData.expiresDate || "N/A"}</td>
                            <td class="p-2 border">${this.whoisData.estimatedDomainAge || "N/A"}</td>
                            <td class="p-2 border">
                                <div class="flex flex-wrap gap-1">
                                    ${
                                        (this.whoisData.nameServers?.hostNames || [])
                                            .map((host, index, array) => 
                                                `<span>${host}${index !== array.length - 1 ? ',' : ''}</span>`
                                            ).join('') || '<span>N/A</span>'
                                    }
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <table border="1" class="sm:hidden grid gap-2 border border-gray-300 p-3 rounded-lg max-sm:max-h-[300px] overflow-y-auto">
                    <tbody>
                        <tr>
                            <td class="p-2 bg-gray-200 whitespace-nowrap border-b border-white">Domain Name</td>
                            <td class="p-2 border whitespace-nowrap">${this.whoisData.domainName || "N/A"}</td>
                        </tr>
                        <tr>
                            <td class="p-2 bg-gray-200 whitespace-nowrap border-b border-white">Registrar</td>
                            <td class="p-2 border whitespace-nowrap">${this.whoisData.registrarName || "N/A"}</td>
                        </tr>
                        <tr>
                            <td class="p-2 bg-gray-200 whitespace-nowrap border-b border-white">Registration Date</td>
                            <td class="p-2 border whitespace-nowrap">${this.whoisData.registryData?.createdDate || this.whoisData.createdDate || "N/A"}</td>
                        </tr>
                        <tr>
                            <td class="p-2 bg-gray-200 whitespace-nowrap border-b border-white">Expiration Date</td>
                            <td class="p-2 border whitespace-nowrap">${this.whoisData.registryData?.expiresDate || this.whoisData.expiresDate || "N/A"}</td>
                        </tr>
                        <tr>
                            <td class="p-2 bg-gray-200 whitespace-nowrap border-b border-white">Estimated Domain Age</td>
                            <td class="p-2 border whitespace-nowrap">${this.whoisData.estimatedDomainAge || "N/A"}</td>
                        </tr>
                        <tr>
                            <td class="p-2 bg-gray-200 whitespace-nowrap">Hostnames</td>
                            <td class="p-2 border whitespace-nowrap">
                                <div class="flex flex-wrap gap-1">
                                    ${
                                        (this.whoisData.nameServers?.hostNames || [])
                                            .map((host, index, array) => 
                                                `<span>${host}${index !== array.length - 1 ? ',' : ''}</span>`
                                            ).join('') || '<span>N/A</span>'
                                    }
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                `;

                this.domainData = domainOutput;

                // Generate Contact Information Table
                let contactOutput = `<h3 class="text-lg font-bold mb-2 sm:hidden">Contact Information</h3>
                <table border="1" class="w-full border-collapse border border-gray-300 text-sm hidden sm:table">
                    <thead>
                        <tr class="bg-gray-200">
                            <th class="p-2 border-r border-white">Registrant Name</th>
                            <th class="p-2 border-r border-white">Technical Contact Name</th>
                            <th class="p-2 border-r border-white">Administrative Contact Name</th>
                            <th class="p-2">Contact Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="p-2 border">${this.whoisData.registrant?.organization || "N/A"}</td>
                            <td class="p-2 border">${this.whoisData.technicalContact?.organization || "N/A"}</td>
                            <td class="p-2 border">${this.whoisData.administrativeContact?.organization || "N/A"}</td>
                            <td class="p-2 border">${this.whoisData.contactEmail || "N/A"}</td>
                        </tr>
                    </tbody>
                </table>
                <table border="1" class="sm:hidden grid gap-2 border border-gray-300 p-3 rounded-lg max-sm:max-h-50 overflow-y-auto">
                    <tbody>
                        <tr>
                            <td class="p-2 bg-gray-200 whitespace-nowrap border-b border-white">Registrant Name</td>
                            <td class="p-2 border whitespace-nowrap">${this.whoisData.registrant?.organization || "N/A"}</td>
                        </tr>
                        <tr>
                            <td class="p-2 bg-gray-200 whitespace-nowrap border-b border-white">Technical Contact Name</td>
                            <td class="p-2 border whitespace-nowrap">${this.whoisData.technicalContact?.organization || "N/A"}</td>
                        </tr>
                        <tr>
                            <td class="p-2 bg-gray-200 whitespace-nowrap border-b border-white">Administrative Contact Name</td>
                            <td class="p-2 border whitespace-nowrap">${this.whoisData.administrativeContact?.organization || "N/A"}</td>
                        </tr>
                        <tr>
                            <td class="p-2 bg-gray-200 whitespace-nowrap">Contact Email</td>
                            <td class="p-2 border whitespace-nowrap">${this.whoisData.contactEmail || "N/A"}</td>
                        </tr>
                    </tbody>
                </table>
                `;

                this.contactData = contactOutput;

                // Update displayed result based on selected infoType
                this.updateResult();

            } catch (error) {
                this.result = `<p style="color:red;">Error fetching data.</p>`;
                console.error("Error:", error);
            } finally {
                this.loading = false;
            }
        },

        updateResult() {
            this.result = this.infoType === "domain" ? this.domainData : this.contactData;
        }
    };
}
