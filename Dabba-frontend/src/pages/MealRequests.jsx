import React, { useEffect, useState } from "react";
import {
  getMyMealRequests,
  updateMealRequest
} from "../services/api";
import socket from "../services/socket";


function MealRequests() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isDonor = user.role === "donor";
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");

  async function loadRequests() {
    const result = await getMyMealRequests();
    setRequests(result.requests);

    if (!result.success) {
      setMessage(result.message);
    }
  }

  useEffect(() => {
  loadRequests();

  socket.on("newRequest", () => {
    loadRequests();
  });

  socket.on("requestAccepted", () => {
    loadRequests();
  });

  socket.on("requestRejected", () => {
    loadRequests();
  });

  return () => {
    socket.off("newRequest");
    socket.off("requestAccepted");
    socket.off("requestRejected");
  };
}, []);

  async function reviewRequest(requestId, status) {
    const result = await updateMealRequest(requestId, status);
    setMessage(result.message);

    if (result.success) {
      await loadRequests();
    }
  }

  return (
    <main className="requests-container">
      <h2>{isDonor ? "Meal Requests Received" : "My Meal Requests"}</h2>
      <p className="page-subtitle">
        {isDonor
          ? "Accept or reject requests sent by receivers."
          : "Contact details appear after the donor accepts your request."}
      </p>

      {message && <p className="message-text">{message}</p>}

      <div className="request-list">
        {requests.length === 0 ? (
          <p className="empty-message">No meal requests yet.</p>
        ) : (
          requests.map((request) => {
            const otherPerson = isDonor
              ? request.receiver
              : request.donor;

            return (
              <article className="request-card" key={request._id}>
                <div className="request-card-heading">
                  <div>
                    <span className="meal-type">
                      {request.meal?.location || "Location unavailable"}
                    </span>
                    <h3>{request.meal?.mealName || "Meal"}</h3>
                  </div>
                  <span className={`request-status ${request.status.toLowerCase()}`}>
                    {request.status}
                  </span>
                </div>

                <p>
                  <strong>{isDonor ? "Requested by:" : "Donor:"}</strong>{" "}
                  {otherPerson?.name || "User"}
                </p>

                {request.status === "Accepted" && (
                  <div className="contact-details">
                    <p><strong>Email:</strong> {otherPerson?.email}</p>
                    <p>
                      <strong>Phone:</strong>{" "}
                      {otherPerson?.phone || "Not provided"}
                    </p>
                    {otherPerson?.phone && (
                      <a href={`tel:${otherPerson.phone}`}>Call</a>
                    )}
                    <a href={`https://mail.google.com/mail/?view=cm&to=${otherPerson?.email}`}
                      target="_blank"
                      rel="noreferrer"
                      >
                       Send Email
                      </a>
                  </div>
                )}

                {isDonor && request.status === "Pending" && (
                  <div className="request-actions">
                    <button
                      className="accept-btn"
                      onClick={() => reviewRequest(request._id, "Accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => reviewRequest(request._id, "Rejected")}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>
    </main>
  );
}

export default MealRequests;
